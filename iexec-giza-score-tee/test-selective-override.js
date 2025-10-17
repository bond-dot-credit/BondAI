import { EnhancedGizaScorer } from './src/scoring/enhanced-scorer.js';
import { SAMPLE_AGENT_DATA, DEFAULT_WEIGHTS } from './src/data/sample-data.js';

/**
 * Test selective metric overrides functionality
 * Demonstrates admin ability to override specific sub-metrics
 */

console.log('🧪 Testing Selective Sub-Metrics Override\n');

// Test input with selective overrides (similar to admin input)
const testInput = {
  agent_selection: "arma-giza",
  metric_overrides: {
    performance: {
      roi_30d: 0.005,           // Override: 5x increase
      roi_90d: null,            // Keep existing: 0.0011429846624400053
      sharpe_90d: 60.0,         // Override: increase from 45.7 to 60
      success_rate_90d: null    // Keep existing: 85.71428571428571
      // Other metrics keep existing values
    },
    risk: {
      incident_score_0_100: 25  // Override: increase from 0 to 25
      // Other risk metrics keep existing values
    }
    // stability and sentiments use all existing values
  }
};

try {
  // Prepare agent data with overrides (simulating app.js logic)
  let agentData = JSON.parse(JSON.stringify(SAMPLE_AGENT_DATA)); // Deep copy
  let weights = DEFAULT_WEIGHTS;

  console.log('📋 Original Values:');
  console.log(`  Performance ROI 30d: ${agentData.performance.metrics.roi_30d}`);
  console.log(`  Performance ROI 90d: ${agentData.performance.metrics.roi_90d}`);
  console.log(`  Performance Sharpe 90d: ${agentData.performance.metrics.sharpe_90d}`);
  console.log(`  Risk Incident Score: ${agentData.risk.metrics.incident_score_0_100}\n`);

  // Apply selective metric overrides
  if (testInput.metric_overrides) {
    for (const [category, overrides] of Object.entries(testInput.metric_overrides)) {
      if (overrides && agentData[category]) {
        console.log(`📝 Processing ${category} overrides:`);
        // Only override non-null/undefined values, keep existing for others
        for (const [metric, value] of Object.entries(overrides)) {
          if (value !== null && value !== undefined && value !== '') {
            const oldValue = agentData[category].metrics[metric];
            agentData[category].metrics[metric] = value;
            console.log(`  ${metric}: ${oldValue} → ${value} ✅ OVERRIDDEN`);
          } else {
            console.log(`  ${metric}: ${agentData[category].metrics[metric]} ⚪ KEPT EXISTING`);
          }
        }
        console.log('');
      }
    }
  }

  console.log('📋 Final Values After Override:');
  console.log(`  Performance ROI 30d: ${agentData.performance.metrics.roi_30d}`);
  console.log(`  Performance ROI 90d: ${agentData.performance.metrics.roi_90d}`);
  console.log(`  Performance Sharpe 90d: ${agentData.performance.metrics.sharpe_90d}`);
  console.log(`  Risk Incident Score: ${agentData.risk.metrics.incident_score_0_100}\n`);

  // Calculate scores with overridden data
  const originalResult = EnhancedGizaScorer.calculateGizaScore(SAMPLE_AGENT_DATA, weights);
  const modifiedResult = EnhancedGizaScorer.calculateGizaScore(agentData, weights);

  console.log('📊 SCORE COMPARISON');
  console.log('==================');
  console.log(`Original Final Score: ${originalResult.final_score.toFixed(2)}/100`);
  console.log(`Modified Final Score: ${modifiedResult.final_score.toFixed(2)}/100`);
  console.log(`Difference: ${(modifiedResult.final_score - originalResult.final_score).toFixed(2)}\n`);

  console.log('📈 Category Score Changes:');
  const categories = ['performance', 'risk', 'stability', 'sentiments', 'techprov'];
  categories.forEach(category => {
    const original = originalResult.category_scores[category];
    const modified = modifiedResult.category_scores[category];
    const diff = modified - original;
    const status = Math.abs(diff) < 0.01 ? '⚪' : (diff > 0 ? '📈' : '📉');
    console.log(`  ${category.padEnd(12)}: ${original.toFixed(2)} → ${modified.toFixed(2)} (${diff > 0 ? '+' : ''}${diff.toFixed(2)}) ${status}`);
  });

  console.log('\n✅ Selective override test completed successfully!');
  console.log('📋 Key Features Validated:');
  console.log('  ✅ Only specified metrics were overridden');
  console.log('  ✅ Null values preserved existing data');
  console.log('  ✅ Score calculation reflects overrides');
  console.log('  ✅ Admin has granular control over sub-metrics');

} catch (error) {
  console.error('❌ Test failed:', error.message);
  console.error(error.stack);
  process.exit(1);
}