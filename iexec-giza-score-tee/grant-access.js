import { IExecDataProtectorCore, getWeb3Provider } from '@iexec/dataprotector';

async function grantGizaAccess(protectedDataAddress = null) {
  try {
    console.log('🔑 Granting access to Giza Score protected data...');

    // Configuration
    const dataAddress = '0x855f43af13e689bfcae7ff8cc859d6afabbb502f';
    const iAppAddress = '0x2d1003f88B918828ca2377020d218e8ED6092367'; // Our NEW deployed Giza Score app
    const privateKey = 'process.env.WALLET_PRIVATE_KEY';
    const authorizedUser = '0xa5EBd895c62fB917d97C6F3E39A4562F1BE5CEee'; // Your wallet

    if (!dataAddress) {
      throw new Error('Protected data address is required. Usage: node grant-access.js <protected-data-address>');
    }

    if (!privateKey) {
      throw new Error('WALLET_PRIVATE_KEY environment variable is required');
    }

    const web3Provider = getWeb3Provider(privateKey);
    const dataProtectorCore = new IExecDataProtectorCore(web3Provider);

    console.log(`🔐 Protected Data: ${dataAddress}`);
    console.log(`🚀 iApp Address: ${iAppAddress}`);
    console.log(`👤 Authorized User: ${authorizedUser}`);

    // Grant access to our Giza Score app
    const grantedAccess = await dataProtectorCore.grantAccess({
      protectedData: dataAddress,
      authorizedApp: iAppAddress,
      authorizedUser: authorizedUser,
      numberOfAccess: 100, // Allow many scoring runs
      pricePerAccess: 0    // Free access
    });

    console.log('✅ Access granted successfully!');
    console.log('🔑 Grant Details:');
    console.log('  - Grant Address:', grantedAccess.address);
    console.log('  - Protected Data:', grantedAccess.protectedData);
    console.log('  - Authorized App:', grantedAccess.authorizedApp);
    console.log('  - Authorized User:', grantedAccess.authorizedUser);
    console.log('  - Number of Access:', grantedAccess.numberOfAccess);
    console.log('  - Price per Access:', grantedAccess.pricePerAccess);
    console.log('  - Transaction Hash:', grantedAccess.txHash);

    console.log('\n🚀 Ready to run Giza Score:');
    console.log(`iapp run ${iAppAddress} --protectedData ${dataAddress}`);

    return grantedAccess;

  } catch (error) {
    console.error('❌ Error granting access:', error.message);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
    process.exit(1);
  }
}

// Run if called directly
if (process.argv[1].includes('grant-access.js')) {
  grantGizaAccess();
}

export { grantGizaAccess };