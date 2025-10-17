/**
 * Enhanced Giza Score Algorithm with Sub-Metrics
 * Simplified v1 implementation using static data
 */

export class EnhancedGizaScorer {

  /**
   * Calculate category score from sub-metrics
   * @param {Object} metrics - Individual metric values
   * @param {Object} weights - Sub-metric weights
   * @param {number} protocolFactor - Protocol factor (0-100)
   * @returns {number} Category score (0-100)
   */
  static calculateCategoryScore(metrics, weights, protocolFactor) {
    let agentScore = 0;
    let totalWeight = 0;

    // Calculate weighted average of agent metrics
    for (const [metric, value] of Object.entries(metrics)) {
      const weight = weights[metric] || 0;
      if (weight > 0 && value !== null && value !== undefined) {
        // Normalize different metric types to 0-100 scale
        let normalizedValue = this.normalizeMetric(metric, value);
        agentScore += weight * normalizedValue;
        totalWeight += weight;
      }
    }

    // Normalize to 0-100 scale if we have weights
    if (totalWeight > 0) {
      agentScore = agentScore / totalWeight;
    }

    // Combine agent score with protocol factor (50/50 split)
    const finalScore = (agentScore + protocolFactor) / 2;

    return Math.max(0, Math.min(100, finalScore));
  }

  /**
   * Normalize individual metrics to 0-100 scale
   * @param {string} metricName - Name of the metric
   * @param {number} value - Raw metric value
   * @returns {number} Normalized value (0-100)
   */
  static normalizeMetric(metricName, value) {
    // Metric-specific normalization rules
    const normalizationRules = {
      // ROI metrics: convert to percentage
      'roi_30d': (v) => Math.min(v * 100, 100),
      'roi_90d': (v) => Math.min(v * 100, 100),

      // Sharpe ratio: cap at 100
      'sharpe_90d': (v) => Math.min(v, 100),

      // Success rate: already percentage
      'success_rate_90d': (v) => v,

      // Capital efficiency: convert small decimal to percentage
      'capital_efficiency_90d': (v) => Math.min(v * 100, 100),

      // Trend: convert to percentage
      'trend_30d': (v) => Math.min(v * 100, 100),

      // Normalized metrics: already 0-1, convert to 0-100
      'audits_norm': (v) => v * 100,
      'credshield_norm': (v) => v * 100,
      'users_norm': (v) => v * 100,
      'mau_norm': (v) => v * 100,
      'asset_norm': (v) => v * 100,
      'lindy_norm': (v) => v * 100,

      // Volatility: invert (lower vol = higher score)
      'vol_90d_ann': (v) => Math.max(0, 100 - (v * 1000)),

      // MDD: invert (lower drawdown = higher score)
      'mdd_90d': (v) => Math.max(0, 100 - (v * 100)),

      // Risk-adjusted TVL: logarithmic scaling
      'risk_adj_tvl': (v) => Math.min(Math.log10(v / 1000000) * 10, 100),

      // Incident score: already 0-100
      'incident_score_0_100': (v) => v,

      // Community sentiment: already 0-100
      'community_sentiment_0_100': (v) => v,

      // Market F&G: already 0-100
      'market_fng_0_100': (v) => v,

      // TVL growth: percentage
      'tvl_growth_90d': (v) => Math.min(v, 100),

      // Liquidity depth: percentage
      'liquidity_depth_ratio': (v) => Math.min(v * 100, 100)
    };

    const normalizer = normalizationRules[metricName];
    if (normalizer) {
      return normalizer(value);
    }

    // Default: treat as already normalized percentage
    return Math.max(0, Math.min(100, value));
  }

  /**
   * Calculate all category scores
   * @param {Object} agentData - Complete agent data
   * @param {Object} weights - Sub-metric weights
   * @returns {Object} Category scores and details
   */
  static calculateAllCategories(agentData, weights) {
    const categories = ['performance', 'risk', 'stability', 'sentiments'];
    const categoryScores = {};
    const categoryDetails = {};

    for (const category of categories) {
      const categoryData = agentData[category];
      const categoryWeights = weights.subMetrics[category];

      if (categoryData && categoryWeights) {
        const score = this.calculateCategoryScore(
          categoryData.metrics,
          categoryWeights,
          categoryData.protocol_factor
        );

        categoryScores[category] = score;
        categoryDetails[category] = {
          score: score,
          agent_component: this.calculateAgentComponent(categoryData.metrics, categoryWeights),
          protocol_factor: categoryData.protocol_factor,
          metrics_breakdown: this.getMetricsBreakdown(categoryData.metrics, categoryWeights),
          existing_score: categoryData.category_score_existing // For validation
        };
      }
    }

    // Technical Provenance (simplified - just use average protocol factor)
    const avgProtocolFactor = Object.values(agentData)
      .filter(cat => cat.protocol_factor)
      .reduce((sum, cat) => sum + cat.protocol_factor, 0) / 4;

    categoryScores.techprov = avgProtocolFactor;
    categoryDetails.techprov = {
      score: avgProtocolFactor,
      agent_component: 0,
      protocol_factor: avgProtocolFactor,
      metrics_breakdown: {},
      note: "Technical Provenance based on protocol research average"
    };

    return { categoryScores, categoryDetails };
  }

  /**
   * Calculate agent component of category score
   */
  static calculateAgentComponent(metrics, weights) {
    let agentScore = 0;
    let totalWeight = 0;

    for (const [metric, value] of Object.entries(metrics)) {
      const weight = weights[metric] || 0;
      if (weight > 0 && value !== null && value !== undefined) {
        let normalizedValue = this.normalizeMetric(metric, value);
        agentScore += weight * normalizedValue;
        totalWeight += weight;
      }
    }

    return totalWeight > 0 ? (agentScore / totalWeight) : 0;
  }

  /**
   * Get detailed breakdown of metrics contribution
   */
  static getMetricsBreakdown(metrics, weights) {
    const breakdown = {};

    for (const [metric, value] of Object.entries(metrics)) {
      const weight = weights[metric] || 0;
      if (weight > 0) {
        breakdown[metric] = {
          raw_value: value,
          normalized_value: this.normalizeMetric(metric, value),
          weight: weight,
          contribution: weight * this.normalizeMetric(metric, value)
        };
      }
    }

    return breakdown;
  }

  /**
   * Calculate final composite score
   * @param {Object} categoryScores - Individual category scores
   * @param {Object} weights - Category weights
   * @returns {Object} Final composite score and breakdown
   */
  static calculateComposite(categoryScores, weights) {
    const categoryWeights = weights.categories;
    let rawScore = 0;

    const breakdown = {};
    for (const [category, score] of Object.entries(categoryScores)) {
      const weight = categoryWeights[category] || 0;
      const contribution = weight * score;
      rawScore += contribution;

      breakdown[category] = {
        score: score,
        weight: weight,
        contribution: contribution
      };
    }

    const compositeScore = Math.round(rawScore * 100) / 100; // Round to 2 decimals

    return {
      score_raw_0_1: rawScore / 100,
      score_out_of_100: compositeScore,
      category_breakdown: breakdown,
      weights_used: categoryWeights
    };
  }

  /**
   * Complete Giza Score calculation
   * @param {Object} agentData - Agent data
   * @param {Object} weights - All weights
   * @returns {Object} Complete scoring results
   */
  static calculateGizaScore(agentData, weights) {
    console.log('Starting Giza Score calculation for agent:', agentData.metadata.agent_name);

    // Calculate category scores
    const { categoryScores, categoryDetails } = this.calculateAllCategories(agentData, weights);

    // Calculate composite score
    const composite = this.calculateComposite(categoryScores, weights);

    // Prepare final result
    const result = {
      metadata: agentData.metadata,
      category_scores: categoryScores,
      category_details: categoryDetails,
      composite_result: composite,
      final_score: composite.score_out_of_100,

      // QA and validation
      qa_checks: {
        weights_sum: Object.values(weights.categories).reduce((a, b) => a + b, 0),
        all_categories_computed: Object.keys(categoryScores).length === 5,
        score_in_range: composite.score_out_of_100 >= 0 && composite.score_out_of_100 <= 100,
        categories_in_range: Object.values(categoryScores).every(score => score >= 0 && score <= 100)
      },

      // For validation against existing scores
      validation: {
        existing_performance: agentData.performance?.category_score_existing,
        existing_risk: agentData.risk?.category_score_existing,
        existing_stability: agentData.stability?.category_score_existing,
        existing_sentiments: agentData.sentiments?.category_score_existing
      }
    };

    console.log('Giza Score calculation completed. Final score:', result.final_score);
    return result;
  }
}