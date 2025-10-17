import fs from 'node:fs/promises';
import { IExecDataProtectorDeserializer } from '@iexec/dataprotector-deserializer';
import { EnhancedGizaScorer } from './scoring/enhanced-scorer.js';
import { SAMPLE_AGENT_DATA, DEFAULT_WEIGHTS } from './data/sample-data.js';

const main = async () => {
  const { IEXEC_OUT, IEXEC_APP_DEVELOPER_SECRET, IEXEC_REQUESTER_SECRET_1 } = process.env;

  let computedJsonObj = {};

  try {
    console.log('🚀 Starting Enhanced Giza Score computation in TEE...');

    let scoreMultiplier = 1.0;

    // Extract override data from DataProtector
    let overrideData = {};
    try {
      const deserializer = new IExecDataProtectorDeserializer();

      // Get the MEDPRIVATE key from app developer secret
      const medPrivateKey = IEXEC_APP_DEVELOPER_SECRET;
      if (!medPrivateKey) {
        throw new Error('MEDPRIVATE key not found in app developer secret');
      }
      console.log('Found MEDPRIVATE key in app secret');

      // Extract all override fields
      try {
        console.log('🔍 Extracting override data from protected data...');

        overrideData.agent_selection = await deserializer.getValue('agent_selection', 'string');
        overrideData.use_sample_data = await deserializer.getValue('use_sample_data', 'bool');

        // Metric overrides
        overrideData.performance_roi_30d = await deserializer.getValue('performance_roi_30d', 'f64');
        overrideData.performance_roi_90d = await deserializer.getValue('performance_roi_90d', 'f64');
        overrideData.performance_sharpe_90d = await deserializer.getValue('performance_sharpe_90d', 'f64');
        overrideData.risk_incident_score = await deserializer.getValue('risk_incident_score', 'f64');

        // Weight overrides
        overrideData.weight_performance = await deserializer.getValue('weight_performance', 'f64');
        overrideData.weight_risk = await deserializer.getValue('weight_risk', 'f64');
        overrideData.weight_stability = await deserializer.getValue('weight_stability', 'f64');
        overrideData.weight_techprov = await deserializer.getValue('weight_techprov', 'f64');
        overrideData.weight_sentiments = await deserializer.getValue('weight_sentiments', 'f64');

        console.log('✅ Successfully extracted override data:', overrideData);
        scoreMultiplier = 1.0; // Use protected data

      } catch (stringError) {
        console.log('❌ Failed to extract override data:', stringError.message);
        throw new Error(`Could not retrieve override data: ${stringError.message}`);
      }

    } catch (e) {
      console.log('Could not access protected data, trying requester secret:', e.message);

      // Fallback: try to get from requester secret
      if (IEXEC_REQUESTER_SECRET_1) {
        scoreMultiplier = parseFloat(IEXEC_REQUESTER_SECRET_1) || 1.0;
        console.log('Using score multiplier from requester secret');
      } else {
        // Final fallback: use command line argument
        const args = process.argv.slice(2);
        if (args.length > 0) {
          scoreMultiplier = parseFloat(args[0]) || 1.0;
          console.log('Using score multiplier from command line argument');
        } else {
          console.log('Using default score multiplier: 1.0');
        }
      }
    }

    console.log(`Score multiplier: ${scoreMultiplier}`);

    // Apply overrides to agent data and weights
    console.log('📊 Applying overrides to agent data...');
    let agentData = JSON.parse(JSON.stringify(SAMPLE_AGENT_DATA)); // Deep copy
    let weights = JSON.parse(JSON.stringify(DEFAULT_WEIGHTS)); // Deep copy

    // Apply metric overrides (only if valid number and >= 0, meaning they were set)
    if (overrideData.performance_roi_30d != null && !isNaN(overrideData.performance_roi_30d) && overrideData.performance_roi_30d >= 0) {
      agentData.performance.metrics.roi_30d = overrideData.performance_roi_30d;
      console.log(`🔧 Override performance_roi_30d: ${overrideData.performance_roi_30d}`);
    }
    if (overrideData.performance_roi_90d != null && !isNaN(overrideData.performance_roi_90d) && overrideData.performance_roi_90d >= 0) {
      agentData.performance.metrics.roi_90d = overrideData.performance_roi_90d;
      console.log(`🔧 Override performance_roi_90d: ${overrideData.performance_roi_90d}`);
    }
    if (overrideData.performance_sharpe_90d != null && !isNaN(overrideData.performance_sharpe_90d) && overrideData.performance_sharpe_90d >= 0) {
      agentData.performance.metrics.sharpe_90d = overrideData.performance_sharpe_90d;
      console.log(`🔧 Override performance_sharpe_90d: ${overrideData.performance_sharpe_90d}`);
    }
    if (overrideData.risk_incident_score != null && !isNaN(overrideData.risk_incident_score) && overrideData.risk_incident_score >= 0) {
      agentData.risk.metrics.incident_score_0_100 = overrideData.risk_incident_score;
      console.log(`🔧 Override risk_incident_score: ${overrideData.risk_incident_score}`);
    }

    // Apply weight overrides (only if valid number and > 0, meaning they were set)
    if (overrideData.weight_performance != null && !isNaN(overrideData.weight_performance) && overrideData.weight_performance > 0) {
      weights.categories.performance = overrideData.weight_performance;
      console.log(`⚖️ Override weight_performance: ${overrideData.weight_performance}`);
    }
    if (overrideData.weight_risk != null && !isNaN(overrideData.weight_risk) && overrideData.weight_risk > 0) {
      weights.categories.risk = overrideData.weight_risk;
      console.log(`⚖️ Override weight_risk: ${overrideData.weight_risk}`);
    }
    if (overrideData.weight_stability != null && !isNaN(overrideData.weight_stability) && overrideData.weight_stability > 0) {
      weights.categories.stability = overrideData.weight_stability;
      console.log(`⚖️ Override weight_stability: ${overrideData.weight_stability}`);
    }
    if (overrideData.weight_techprov != null && !isNaN(overrideData.weight_techprov) && overrideData.weight_techprov > 0) {
      weights.categories.techprov = overrideData.weight_techprov;
      console.log(`⚖️ Override weight_techprov: ${overrideData.weight_techprov}`);
    }
    if (overrideData.weight_sentiments != null && !isNaN(overrideData.weight_sentiments) && overrideData.weight_sentiments > 0) {
      weights.categories.sentiments = overrideData.weight_sentiments;
      console.log(`⚖️ Override weight_sentiments: ${overrideData.weight_sentiments}`);
    }

    console.log('🧮 Starting enhanced Giza Score calculation with overrides...');
    const scoringResult = EnhancedGizaScorer.calculateGizaScore(agentData, weights);

    // Add TEE metadata
    scoringResult.tee_metadata = {
      timestamp: new Date().toISOString(),
      confidential_computing: true,
      tee_protected: true,
      algorithm_version: "giza_score_v1.0_enhanced",
      data_source: "sample_data",
      computation_environment: "iExec TEE (Intel SGX)"
    };

    console.log(`Enhanced Giza Score result: ${scoringResult.final_score}/100`);

    // Public output - only the final score (no algorithm or data details)
    const publicOutput = {
      agent_name: agentData.metadata.agent_name,
      final_score: scoringResult.final_score,
      computation_date: scoringResult.tee_metadata.timestamp,
      tee_protected: true
    };

    await fs.writeFile(
      `${IEXEC_OUT}/giza_score_result.json`,
      JSON.stringify(publicOutput, null, 2)
    );

    // Simple score output
    await fs.writeFile(`${IEXEC_OUT}/final_score.txt`, scoringResult.final_score.toString());

    console.log('✅ Enhanced Giza Score computation completed successfully');

    // Build the "computed.json" object (exact same format as working version)
    computedJsonObj = {
      'deterministic-output-path': `${IEXEC_OUT}/giza_score_result.json`,
    };

  } catch (e) {
    console.log('Error in scoring algorithm:', e.message);
    console.log('Stack trace:', e.stack);

    // Create error result (exact same format as working version)
    const errorResult = {
      error: e.message,
      timestamp: new Date().toISOString(),
      success: false
    };

    await fs.writeFile(
      `${IEXEC_OUT}/giza_score_error.json`,
      JSON.stringify(errorResult, null, 2)
    );

    // Build the "computed.json" object with error (exact same format as working version)
    computedJsonObj = {
      'deterministic-output-path': `${IEXEC_OUT}/giza_score_error.json`,
      'error-message': e.message,
    };
  } finally {
    // Save the "computed.json" file (exact same format as working version)
    await fs.writeFile(
      `${IEXEC_OUT}/computed.json`,
      JSON.stringify(computedJsonObj, null, 2)
    );

    console.log('Computation completed, computed.json saved');
  }
};

main();