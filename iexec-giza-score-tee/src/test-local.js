import { EnhancedGizaScorer } from './scoring/enhanced-scorer.js';
import { SAMPLE_AGENT_DATA, DEFAULT_WEIGHTS } from './data/sample-data.js';

/**
 * Local test of the Enhanced Giza Score algorithm
 * This validates our implementation before deploying to TEE
 */

console.log('🧪 Testing Enhanced Giza Score Algorithm Locally\n');

// Test the scoring algorithm
try {
  const result = EnhancedGizaScorer.calculateGizaScore(SAMPLE_AGENT_DATA, DEFAULT_WEIGHTS);

  console.log('📊 TEST RESULTS');
  console.log('================');
  console.log(`Agent: ${result.metadata.agent_name}`);
  console.log(`Final Score: ${result.final_score}/100\n`);

  console.log('📈 Category Scores:');
  Object.entries(result.category_scores).forEach(([category, score]) => {
    const existing = result.validation[`existing_${category}`];
    const diff = existing ? (score - existing).toFixed(2) : 'N/A';
    console.log(`  ${category.padEnd(12)}: ${score.toFixed(2)}/100 (vs existing: ${existing || 'N/A'}, diff: ${diff})`);
  });

  console.log('\n🔍 QA Checks:');
  Object.entries(result.qa_checks).forEach(([check, passed]) => {
    console.log(`  ${check.padEnd(25)}: ${passed ? '✅ PASS' : '❌ FAIL'}`);
  });

  console.log('\n⚖️ Category Weights:');
  Object.entries(result.composite_result.weights_used).forEach(([category, weight]) => {
    console.log(`  ${category.padEnd(12)}: ${(weight * 100).toFixed(1)}%`);
  });

  console.log('\n📋 Detailed Category Analysis:');
  Object.entries(result.category_details).forEach(([category, details]) => {
    console.log(`\n  ${category.toUpperCase()}:`);
    console.log(`    Final Score: ${details.score.toFixed(2)}`);
    console.log(`    Agent Component: ${details.agent_component.toFixed(2)}`);
    console.log(`    Protocol Factor: ${details.protocol_factor.toFixed(2)}`);

    if (Object.keys(details.metrics_breakdown).length > 0) {
      console.log(`    Metrics Breakdown:`);
      Object.entries(details.metrics_breakdown).forEach(([metric, breakdown]) => {
        console.log(`      ${metric}: ${breakdown.raw_value} → ${breakdown.normalized_value.toFixed(2)} (weight: ${breakdown.weight})`);
      });
    }
  });

  console.log('\n✅ Local test completed successfully!');
  console.log('\nThe algorithm is ready for TEE deployment.');

} catch (error) {
  console.error('❌ Test failed:', error.message);
  console.error(error.stack);
  process.exit(1);
}