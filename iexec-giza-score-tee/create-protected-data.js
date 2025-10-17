import { IExecDataProtectorCore, getWeb3Provider } from '@iexec/dataprotector';

async function createGizaProtectedData(customOverrides = null) {
  try {
    console.log('🔐 Creating Giza Score protected data...');

    // Use the wallet private key from environment variable
    const privateKey = process.env.WALLET_PRIVATE_KEY;
    if (!privateKey) {
      throw new Error('WALLET_PRIVATE_KEY environment variable is required');
    }
    const web3Provider = getWeb3Provider(privateKey);

    // Initialize DataProtector Core
    const dataProtectorCore = new IExecDataProtectorCore(web3Provider);

    // Default Giza Score data
    const baseData = {
      agent_selection: 'arma-giza',
      use_sample_data: true
    };

    // Add custom overrides if provided
    let protectedData;
    if (customOverrides) {
      console.log('📝 Creating custom dataset with admin overrides...');

      // Flatten data for Borsh compatibility - all scalar types
      const customData = {
        // Basic config (strings and booleans - Borsh compatible)
        agent_selection: baseData.agent_selection,          // string
        use_sample_data: baseData.use_sample_data,          // bool

        // Metric overrides as individual scalar fields (f64 compatible)
        performance_roi_30d: customOverrides.metric_overrides?.performance?.roi_30d || -1.0,           // f64 (-1 = not set)
        performance_roi_90d: customOverrides.metric_overrides?.performance?.roi_90d || -1.0,           // f64
        performance_sharpe_90d: customOverrides.metric_overrides?.performance?.sharpe_90d || -1.0,     // f64
        risk_incident_score: customOverrides.metric_overrides?.risk?.incident_score_0_100 || -1.0,    // f64

        // Weight overrides as individual scalar fields (f64 compatible)
        weight_performance: customOverrides.weight_overrides?.categories?.performance || -1.0,         // f64
        weight_risk: customOverrides.weight_overrides?.categories?.risk || -1.0,                       // f64
        weight_stability: customOverrides.weight_overrides?.categories?.stability || -1.0,             // f64
        weight_techprov: customOverrides.weight_overrides?.categories?.techprov || -1.0,               // f64
        weight_sentiments: customOverrides.weight_overrides?.categories?.sentiments || -1.0            // f64
      };

      protectedData = await dataProtectorCore.protectData({
        data: customData,
        name: `Giza Score Custom Data - ${new Date().toISOString()}`
      });

      console.log('✅ Custom protected data created with Borsh-compatible scalar fields!');
    } else {
      console.log('📋 Creating default dataset (no overrides)...');

      // Default data with Borsh-compatible scalar types only
      const defaultData = {
        agent_selection: baseData.agent_selection,    // string
        use_sample_data: baseData.use_sample_data,    // bool

        // All override fields set to -1.0 (indicating not set)
        performance_roi_30d: -1.0,                   // f64
        performance_roi_90d: -1.0,                   // f64
        performance_sharpe_90d: -1.0,                // f64
        risk_incident_score: -1.0,                   // f64
        weight_performance: -1.0,                    // f64
        weight_risk: -1.0,                           // f64
        weight_stability: -1.0,                      // f64
        weight_techprov: -1.0,                       // f64
        weight_sentiments: -1.0                      // f64
      };

      protectedData = await dataProtectorCore.protectData({
        data: defaultData,
        name: 'Giza Score Default Data'
      });

      console.log('✅ Default protected data created with Borsh-compatible scalar fields!');
    }

    console.log('🔐 Protected Data Details:');
    console.log('  - Address:', protectedData.address);
    console.log('  - Owner:', protectedData.owner);
    console.log('  - Name:', protectedData.name);
    console.log('  - Transaction ID:', protectedData.txHash);

    console.log('\n📋 Next steps:');
    console.log(`1. Grant access: node grant-access.js ${protectedData.address}`);
    console.log(`2. Run scoring: iapp run 0x2D4C9783960d9d1D487c9c8Be304Dd1b02308dB9 --protectedData ${protectedData.address}`);

    return protectedData.address;

  } catch (error) {
    console.error('❌ Error creating protected data:', error.message);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
    process.exit(1);
  }
}

// CLI usage
if (process.argv[2] === 'custom') {
  // Example custom overrides
  const customOverrides = {
    metric_overrides: {
      performance: {
        roi_30d: 0.005,
        sharpe_90d: 60.0
      },
      risk: {
        incident_score_0_100: 25
      }
    }
  };

  createGizaProtectedData(customOverrides);
} else {
  // Default dataset
  createGizaProtectedData();
}

export { createGizaProtectedData };