/**
 * Sample Giza Score Data (v1) - Direct from rating_data CSV files
 * Simplified approach: hardcoded data for initial implementation
 */

export const SAMPLE_AGENT_DATA = {
  metadata: {
    agent_id: "1",
    agent_name: "ARMA (Giza)",
    as_of: "2025-08-11", // Latest date from CSV
    algorithm_version: "giza_score_v1.0",
    data_source: "csv_static"
  },

  // Performance data from category_performance_daily_2025-09-17.csv
  performance: {
    metrics: {
      roi_30d: 0.0011429846624400053,
      roi_90d: 0.0011429846624400053,
      vol_90d_ann: 0.0013034430246890998,
      sharpe_90d: 45.70216001172976,
      sortino_90d: 0, // Empty in CSV
      trend_30d: 0.0011429846624400053,
      capital_efficiency_90d: 0.0011335871462449156,
      success_rate_90d: 85.71428571428571
    },
    protocol_factor: 84.14563382444972,
    category_score_existing: 17.08 // From CSV for validation
  },

  // Risk data from category_risk_daily_2025-09-17.csv
  risk: {
    metrics: {
      audits_norm: 1,
      credshield_norm: 0.72,
      vol_90d_ann: 0.0013034430246890998,
      mdd_90d: 0,
      risk_adj_tvl: 10132946396.980116,
      incident_score_0_100: 0
    },
    protocol_factor: 85.77877146115851,
    category_score_existing: 90.84 // From CSV for validation
  },

  // Stability data from category_stability_daily_2025-09-17.csv
  stability: {
    metrics: {
      asset_norm: 1,
      lindy_norm: 0.7252774622585993,
      tvl_growth_90d: 0,
      liquidity_depth_ratio: 0
    },
    protocol_factor: 81.49528264372802,
    category_score_existing: 86.21 // From CSV for validation
  },

  // Sentiments data from category_sentiments_daily_2025-09-19.csv
  sentiments: {
    metrics: {
      users_norm: 0.7024,
      mau_norm: 0.7463333333333333,
      community_sentiment_0_100: 78.9,
      market_fng_0_100: 0 // Empty in CSV
    },
    protocol_factor: 85.4,
    category_score_existing: 36.22 // From CSV for validation
  }
};

export const DEFAULT_WEIGHTS = {
  // Category weights for final composite (from your spec)
  categories: {
    performance: 0.25,
    risk: 0.25,
    stability: 0.15,
    techprov: 0.20,
    sentiments: 0.15
  },

  // Sub-metric weights within each category (configurable)
  subMetrics: {
    performance: {
      roi_30d: 0.15,
      roi_90d: 0.15,
      sharpe_90d: 0.25,
      success_rate_90d: 0.20,
      capital_efficiency_90d: 0.15,
      trend_30d: 0.10
    },

    risk: {
      audits_norm: 0.30,
      credshield_norm: 0.25,
      incident_score_0_100: 0.20,
      risk_adj_tvl: 0.15,
      vol_90d_ann: 0.10
    },

    stability: {
      asset_norm: 0.40,
      lindy_norm: 0.35,
      tvl_growth_90d: 0.15,
      liquidity_depth_ratio: 0.10
    },

    sentiments: {
      users_norm: 0.35,
      mau_norm: 0.30,
      community_sentiment_0_100: 0.25,
      market_fng_0_100: 0.10
    }
  }
};

// Alternative agent data for testing (can be selected via input)
export const ALTERNATIVE_AGENTS = {
  "fungi-agent": {
    metadata: {
      agent_id: "2",
      agent_name: "Fungi Agent",
      as_of: "2025-08-11"
    },
    // Mock data for second agent
    performance: {
      metrics: {
        roi_30d: 0.0008,
        roi_90d: 0.0008,
        sharpe_90d: 38.5,
        success_rate_90d: 78.2
        // ... other metrics
      },
      protocol_factor: 75.2
    }
    // ... other categories
  }
};

// Input format for TEE with configurable sub-metrics
export const INPUT_TEMPLATE = {
  agent_selection: "arma-giza", // or "fungi-agent" or "custom"
  date_override: null, // Optional date override

  // Admin can override any weights
  weight_overrides: {
    categories: null, // Will use DEFAULT_WEIGHTS if null
    subMetrics: null
  },

  // Admin can override specific sub-metrics (only non-null values will be applied)
  metric_overrides: {
    performance: {
      roi_30d: null,              // Leave null to use existing data
      roi_90d: null,              // Input value to override
      sharpe_90d: null,
      success_rate_90d: null,
      capital_efficiency_90d: null,
      trend_30d: null
    },
    risk: {
      audits_norm: null,
      credshield_norm: null,
      vol_90d_ann: null,
      risk_adj_tvl: null,
      incident_score_0_100: null
    },
    stability: {
      asset_norm: null,
      lindy_norm: null,
      tvl_growth_90d: null,
      liquidity_depth_ratio: null
    },
    sentiments: {
      users_norm: null,
      mau_norm: null,
      community_sentiment_0_100: null,
      market_fng_0_100: null
    }
  }
};

// Example with partial metric overrides
export const EXAMPLE_ADMIN_INPUT = {
  agent_selection: "arma-giza",
  metric_overrides: {
    performance: {
      roi_30d: 0.005,           // Override this specific metric
      roi_90d: null,            // Keep existing value
      sharpe_90d: 50.0          // Override this specific metric
      // Other metrics will use existing values
    },
    risk: {
      incident_score_0_100: 15  // Override incident score only
      // Other risk metrics will use existing values
    }
    // stability and sentiments will use all existing values
  }
};