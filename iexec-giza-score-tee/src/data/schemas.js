/**
 * Data schemas for Giza Score TEE Application
 * Based on rating_data CSV structure analysis
 */

export const CSV_SCHEMAS = {
  performance: {
    required: ['agent_id', 'as_of'],
    metrics: [
      'roi_30d',
      'roi_90d',
      'vol_90d_ann',
      'sharpe_90d',
      'sortino_90d',
      'trend_30d',
      'capital_efficiency_90d',
      'success_rate_90d'
    ],
    protocol: 'proto_performance_0_100',
    final: 'category_score_out_of_100'
  },

  risk: {
    required: ['agent_id', 'as_of'],
    metrics: [
      'audits_norm',
      'credshield_norm',
      'vol_90d_ann',
      'mdd_90d',
      'risk_adj_tvl',
      'incident_score_0_100'
    ],
    protocol: 'proto_risk_0_100',
    final: 'category_score_out_of_100'
  },

  stability: {
    required: ['agent_id', 'as_of'],
    metrics: [
      'asset_norm',
      'lindy_norm',
      'tvl_growth_90d',
      'liquidity_depth_ratio'
    ],
    protocol: 'proto_stability_0_100',
    final: 'category_score_out_of_100'
  },

  sentiments: {
    required: ['agent_id', 'as_of'],
    metrics: [
      'users_norm',
      'mau_norm',
      'community_sentiment_0_100',
      'market_fng_0_100'
    ],
    protocol: 'proto_sentiment_0_100',
    final: 'category_score_out_of_100'
  }
};

export const DEFAULT_WEIGHTS = {
  // Category weights for final composite
  categories: {
    performance: 0.25,
    risk: 0.25,
    stability: 0.15,
    techprov: 0.20,
    sentiments: 0.15
  },

  // Sub-metric weights within each category
  subMetrics: {
    performance: {
      roi_30d: 0.15,
      roi_90d: 0.15,
      sharpe_90d: 0.20,
      success_rate_90d: 0.15,
      capital_efficiency_90d: 0.10,
      vol_90d_ann: 0.10,
      trend_30d: 0.10,
      sortino_90d: 0.05
    },

    risk: {
      audits_norm: 0.25,
      credshield_norm: 0.20,
      incident_score_0_100: 0.20,
      risk_adj_tvl: 0.15,
      vol_90d_ann: 0.10,
      mdd_90d: 0.10
    },

    stability: {
      asset_norm: 0.30,
      lindy_norm: 0.25,
      tvl_growth_90d: 0.25,
      liquidity_depth_ratio: 0.20
    },

    sentiments: {
      users_norm: 0.30,
      mau_norm: 0.25,
      community_sentiment_0_100: 0.25,
      market_fng_0_100: 0.20
    }
  }
};

export const VALIDATION_RULES = {
  agent_id: {
    type: 'string',
    required: true
  },
  as_of: {
    type: 'date',
    required: true
  },

  // Numeric ranges for validation
  ranges: {
    roi_30d: { min: -1, max: 10 },
    roi_90d: { min: -1, max: 10 },
    sharpe_90d: { min: -10, max: 100 },
    success_rate_90d: { min: 0, max: 100 },
    audits_norm: { min: 0, max: 1 },
    credshield_norm: { min: 0, max: 1 },
    users_norm: { min: 0, max: 1 },
    mau_norm: { min: 0, max: 1 },
    asset_norm: { min: 0, max: 1 },
    lindy_norm: { min: 0, max: 1 }
  }
};

/**
 * Structured data format expected by TEE application
 */
export const TEE_INPUT_SCHEMA = {
  metadata: {
    agent_id: 'string',
    as_of: 'string', // ISO date format
    algorithm_version: 'string',
    data_source: 'string' // 'csv' or 'manual'
  },

  categories: {
    performance: {
      metrics: 'object', // Key-value pairs of metric names and values
      protocol_factor: 'number',
      weights: 'object'
    },
    risk: {
      metrics: 'object',
      protocol_factor: 'number',
      weights: 'object'
    },
    stability: {
      metrics: 'object',
      protocol_factor: 'number',
      weights: 'object'
    },
    sentiments: {
      metrics: 'object',
      protocol_factor: 'number',
      weights: 'object'
    }
  },

  weights: {
    categories: 'object',
    subMetrics: 'object'
  }
};