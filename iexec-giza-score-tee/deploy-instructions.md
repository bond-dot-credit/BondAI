# Enhanced Giza Score TEE Deployment Instructions

## Prerequisites

1. **iExec SDK**: Install globally
   ```bash
   npm install -g iexec
   ```

2. **Docker**: Required for building the application image

3. **Wallet**: Ethereum wallet with RLC tokens for deployment costs

## Deployment Steps

### 1. Initialize iExec Wallet

```bash
# Navigate to app directory
cd iexec-giza-score-tee

# Initialize wallet (follow prompts)
iexec wallet create
# OR import existing wallet
iexec wallet import <private-key>

# Check wallet info
iexec wallet show
```

### 2. Build Docker Image

```bash
# Build the application image
docker build -t enhanced-giza-score .

# Verify image
docker images | grep enhanced-giza-score
```

### 3. Test Locally (Optional)

```bash
# Test the application locally
npm test

# Run local Docker test
docker run --rm \
  -e IEXEC_OUT=/tmp/output \
  -v /tmp/output:/tmp/output \
  enhanced-giza-score
```

### 4. Deploy to iExec

```bash
# Deploy application to iExec registry
iexec app deploy --chain bellecour

# Note the deployed app address from output
# Example: App deployed at address 0x1234...
```

### 5. Create DataProtector Dataset (Optional)

If using protected data instead of requester secrets:

```bash
# Create protected dataset
iexec dataset init
iexec dataset deploy --chain bellecour

# Protect the dataset
iexec dataset push-secret <dataset-address> --chain bellecour
```

### 6. Run TEE Task

```bash
# Method 1: Using requester secret
iexec task run <app-address> \
  --tag tee \
  --chain bellecour \
  --secret 1='{"agent_selection":"arma-giza","use_sample_data":true}'

# Method 2: Using protected data (if dataset created)
iexec task run <app-address> \
  --tag tee \
  --chain bellecour \
  --input-files <dataset-address>
```

### 7. Monitor and Retrieve Results

```bash
# Check task status
iexec task show <task-id> --chain bellecour

# Download results when completed
iexec task download <task-id> --chain bellecour

# Results will be in the downloaded folder:
# - giza_score_detailed.json (complete results)
# - giza_score_summary.json (simplified results)
# - final_score.txt (just the score)
```

## Input Data Format

### Requester Secret Format

```json
{
  "agent_selection": "arma-giza",
  "use_sample_data": true,
  "weight_overrides": {
    "categories": {
      "performance": 0.30,
      "risk": 0.25,
      "stability": 0.15,
      "techprov": 0.15,
      "sentiments": 0.15
    }
  },
  "metric_overrides": {
    "performance": {
      "roi_30d": 0.002,        // Override this metric
      "roi_90d": null,         // Keep existing value
      "sharpe_90d": 50.0       // Override this metric
    },
    "risk": {
      "incident_score_0_100": 15  // Override only incident score
    }
  }
}
```

**Key Features**:
- **Selective Overrides**: Only non-null values override existing data
- **Existing Data Preserved**: Null values keep original CSV data
- **Admin Flexibility**: Input specific sub-metrics like `roi_30d` without affecting others

### DataProtector Format

For protected data, encrypt the same JSON structure using iExec DataProtector SDK.

## Expected Outputs

1. **giza_score_result.json**: Public output with only final score and metadata
2. **final_score.txt**: Just the final score (0-100)
3. **computed.json**: iExec-required output metadata

Note: Algorithm details and input data are kept confidential within the TEE and not exposed in outputs.

## Cost Estimation

### Development (Bellecour Network)
- **App Deployment**: **FREE** (0 RLC) - Sponsored by iExec for development
- **Task Execution**: **FREE** (0 RLC) - Sponsored testing on Bellecour
- **Data Protection**: **FREE** (0 RLC) - No cost for development testing

### Production (Mainnet)
- **App Deployment**: ~1 RLC
- **Task Execution**: ~0.1 RLC per run
- **Data Protection**: ~0.05 RLC (if using DataProtector)

**Note**: Bellecour testnet is sponsored by iExec, allowing free development and testing without RLC costs.

## Network Configuration

- **Chain**: Bellecour (Chain ID: 134)
- **TEE Framework**: Intel SGX
- **Registry**: iExec marketplace

## Troubleshooting

### Common Issues

1. **Insufficient RLC**: Check wallet balance with `iexec wallet show`
2. **Docker build fails**: Ensure Docker daemon is running
3. **TEE execution timeout**: Large datasets may need longer timeout
4. **Secret format error**: Validate JSON syntax before submitting

### Debug Commands

```bash
# Check app details
iexec app show <app-address> --chain bellecour

# View task logs
iexec task logs <task-id> --chain bellecour

# Test docker locally with debug
docker run --rm -it \
  -e IEXEC_OUT=/tmp/output \
  -e DEBUG=true \
  -v /tmp/output:/tmp/output \
  enhanced-giza-score sh
```

## Security Notes

- TEE ensures computation confidentiality
- Input data is encrypted during processing
- Results are signed by Intel SGX attestation
- No sensitive data leaves the secure enclave during computation

## Monitoring

Monitor your deployed application at:
- iExec Explorer: https://explorer.iex.ec
- Your wallet transactions
- Task execution status

## Next Steps

After successful deployment:
1. Integrate with Bond Credit dashboard
2. Set up automated scoring workflows
3. Configure DataProtector for sensitive data
4. Implement result caching and analytics