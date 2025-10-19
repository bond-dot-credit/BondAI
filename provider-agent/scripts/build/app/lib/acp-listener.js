"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleNewJob = handleNewJob;
exports.startAcpListener = startAcpListener;
var ethers_1 = require("ethers");
var iexec_1 = require("iexec");
var dataprotector_1 = require("@iexec/dataprotector");
var axios_1 = __importDefault(require("axios"));
var jszip_1 = __importDefault(require("jszip"));
// import { create } from 'ipfs-http-client';
var JobOffer_ABI_1 = __importDefault(require("../../contract/JobOffer_ABI"));
var ReputationRegistry_abi_1 = __importDefault(require("../../contract/ReputationRegistry_abi"));
var jobOfferingAddress = '0x959591Bab069599cAbb2A72AA371503ba2d042FF';
var reputationRegistryAddress = '0xB5048e3ef1DA4E04deB6f7d0423D06F63869e322';
var identityRegistryAddress = '0x7177a6867296406881E20d6647232314736Dd09A';
var sellerAgentAddress = process.env.SELLER_AGENT_WALLET_ADDRESS;
var sellerAgentPrivateKey = process.env.SELLER_AGENT_PRIVATE_KEY;
var whitelistedWalletPrivateKey = process.env.WHITELISTED_WALLET_PRIVATE_KEY;
var dummyAgentPrivateKey = process.env.DUMMY_AGENT_PRIVATE_KEY;
var dummyAgentAddress = process.env.DUMMY_AGENT_ADDRESS;
var dummyAgentId = 1;
var iexecAppAddress = '0x2d1003f88B918828ca2377020d218e8ED6092367';
// Create an IPFS client
// const ipfs = create({ host: 'localhost', port: 5001, protocol: 'http' });
function handleNewJob(jobId, jobOfferingContract) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, memos, total, agentAddress, result, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("Handling new job: ".concat(jobId.toString()));
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, jobOfferingContract.getMemosForPhase(jobId, 0, 0, 10)];
                case 2:
                    _a = _b.sent(), memos = _a[0], total = _a[1];
                    if (total.eq(0)) {
                        console.error("No memos found for job ".concat(jobId.toString()));
                        return [2 /*return*/];
                    }
                    agentAddress = memos[0].content;
                    console.log("Agent to be scored: ".concat(agentAddress));
                    return [4 /*yield*/, triggerIexecTask(agentAddress)];
                case 3:
                    result = _b.sent();
                    if (!(result && result.scoreData && result.resultUrl)) return [3 /*break*/, 5];
                    return [4 /*yield*/, publishScore(result.scoreData, jobOfferingContract, jobId, result.resultUrl)];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_1 = _b.sent();
                    console.error("Error handling job ".concat(jobId.toString(), ":"), error_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function triggerIexecTask(agentAddress) {
    return __awaiter(this, void 0, void 0, function () {
        var ethProvider, signer, iexec, dataProtector, protectedData, apporder, workerpoolorder, requestorderToSign, _a, _b, requestorder, deal, taskId, results, response, zip, resultFile, resultContent, scoreData, error_2;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!whitelistedWalletPrivateKey) {
                        console.error('WHITELISTED_WALLET_PRIVATE_KEY environment variable is not set.');
                        return [2 /*return*/, null];
                    }
                    ethProvider = new ethers_1.JsonRpcProvider('https://sepolia.base.org');
                    signer = new ethers_1.Wallet(whitelistedWalletPrivateKey, ethProvider);
                    iexec = new iexec_1.IExec({ ethProvider: signer });
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 15, , 16]);
                    console.log('🔐 Creating protected data for agent:', agentAddress);
                    dataProtector = new dataprotector_1.IExecDataProtectorCore((0, dataprotector_1.getWeb3Provider)(whitelistedWalletPrivateKey));
                    return [4 /*yield*/, dataProtector.protectData({ data: { agentAddress: agentAddress } })];
                case 2:
                    protectedData = _d.sent();
                    console.log('📋 Fetching iExec orders...');
                    return [4 /*yield*/, iexec.orderbook.fetchAppOrder(iexecAppAddress)];
                case 3:
                    apporder = _d.sent();
                    return [4 /*yield*/, iexec.orderbook.fetchWorkerpoolOrder({ category: apporder.category, minTag: 'tee' })];
                case 4:
                    workerpoolorder = _d.sent();
                    console.log('📝 Creating request order...');
                    _b = (_a = iexec.order).createRequestorder;
                    _c = {
                        app: iexecAppAddress,
                        category: apporder.category,
                        appmaxprice: apporder.appprice,
                        workerpoolmaxprice: workerpoolorder.workerpoolprice
                    };
                    return [4 /*yield*/, signer.getAddress()];
                case 5: return [4 /*yield*/, _b.apply(_a, [(_c.requester = _d.sent(),
                            _c.volume = 1,
                            _c.params = { iexec_args: agentAddress },
                            _c.dataset = protectedData.address,
                            _c)])];
                case 6:
                    requestorderToSign = _d.sent();
                    return [4 /*yield*/, iexec.order.signRequestorder(requestorderToSign)];
                case 7:
                    requestorder = _d.sent();
                    console.log('🤝 Matching orders...');
                    return [4 /*yield*/, iexec.order.matchOrders({ apporder: apporder, workerpoolorder: workerpoolorder, requestorder: requestorder })];
                case 8:
                    deal = _d.sent();
                    return [4 /*yield*/, iexec.deal.computeTaskId(deal.dealid, 0)];
                case 9:
                    taskId = _d.sent();
                    console.log('⏳ Waiting for task results, taskId:', taskId);
                    return [4 /*yield*/, iexec.task.fetchResults(taskId)];
                case 10:
                    results = _d.sent();
                    if (!(results && results.url)) return [3 /*break*/, 14];
                    console.log('📥 Downloading results from:', results.url);
                    return [4 /*yield*/, axios_1.default.get(results.url, { responseType: 'arraybuffer' })];
                case 11:
                    response = _d.sent();
                    return [4 /*yield*/, jszip_1.default.loadAsync(response.data)];
                case 12:
                    zip = _d.sent();
                    resultFile = zip.file('giza_score_result.json');
                    if (!resultFile) return [3 /*break*/, 14];
                    return [4 /*yield*/, resultFile.async('string')];
                case 13:
                    resultContent = _d.sent();
                    scoreData = JSON.parse(resultContent);
                    console.log('✅ Score calculated:', scoreData.final_score);
                    return [2 /*return*/, { scoreData: scoreData, resultUrl: results.url }];
                case 14: return [3 /*break*/, 16];
                case 15:
                    error_2 = _d.sent();
                    console.error('❌ Error triggering iExec task:', error_2);
                    return [3 /*break*/, 16];
                case 16: return [2 /*return*/, null];
            }
        });
    });
}
function publishScore(scoreData, jobOfferingContract, jobId, iexecResultUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var fileuri, ethProvider, dummyAgentWallet, providerWallet, reputationRegistry, feedbackAuth, structHash, messageHash, signature, feedbackAuthBytes, fullAuth, score, filehash, tx, deliverableMemo, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!sellerAgentPrivateKey) {
                        console.error('SELLER_AGENT_PRIVATE_KEY environment variable is not set.');
                        return [2 /*return*/];
                    }
                    if (!dummyAgentPrivateKey) {
                        console.error('DUMMY_AGENT_PRIVATE_KEY environment variable is not set.');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    fileuri = iexecResultUrl.replace('https://ipfs.iex.ec/ipfs/', 'ipfs://');
                    console.log('📎 Result URI:', fileuri);
                    ethProvider = new ethers_1.JsonRpcProvider('https://sepolia.base.org');
                    dummyAgentWallet = new ethers_1.Wallet(dummyAgentPrivateKey, ethProvider);
                    providerWallet = new ethers_1.Wallet(sellerAgentPrivateKey, ethProvider);
                    reputationRegistry = new ethers_1.Contract(reputationRegistryAddress, ReputationRegistry_abi_1.default, dummyAgentWallet);
                    feedbackAuth = {
                        agentId: dummyAgentId,
                        clientAddress: sellerAgentAddress,
                        indexLimit: 1,
                        expiry: Math.floor(Date.now() / 1000) + 3600,
                        chainId: 84532,
                        identityRegistry: identityRegistryAddress,
                        signerAddress: dummyAgentAddress,
                    };
                    structHash = (0, ethers_1.keccak256)(ethers_1.AbiCoder.defaultAbiCoder().encode(['uint256', 'address', 'uint64', 'uint256', 'uint256', 'address', 'address'], Object.values(feedbackAuth)));
                    messageHash = (0, ethers_1.keccak256)((0, ethers_1.toUtf8Bytes)("\u0019Ethereum Signed Message:\n32".concat(structHash.slice(2))));
                    return [4 /*yield*/, dummyAgentWallet.signMessage((0, ethers_1.getBytes)(messageHash))];
                case 2:
                    signature = _a.sent();
                    feedbackAuthBytes = ethers_1.AbiCoder.defaultAbiCoder().encode(['uint256', 'address', 'uint64', 'uint256', 'uint256', 'address', 'address'], Object.values(feedbackAuth));
                    fullAuth = (0, ethers_1.concat)([feedbackAuthBytes, signature]);
                    score = Math.round(scoreData.final_score);
                    filehash = (0, ethers_1.keccak256)((0, ethers_1.toUtf8Bytes)(JSON.stringify(scoreData)));
                    console.log('📝 Publishing score to ReputationRegistry...');
                    return [4 /*yield*/, reputationRegistry.giveFeedback(dummyAgentId, score, (0, ethers_1.encodeBytes32String)('giza-score'), (0, ethers_1.encodeBytes32String)(''), fileuri, filehash, fullAuth)];
                case 3:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.wait()];
                case 4:
                    _a.sent();
                    console.log('✅ Score published:', tx.hash);
                    // Deliver the DeliverableMemo (provider creates the memo)
                    console.log('📤 Sending DeliverableMemo...');
                    return [4 /*yield*/, jobOfferingContract.connect(providerWallet).createMemo(jobId, fileuri, 1, false, 3)];
                case 5:
                    deliverableMemo = _a.sent();
                    return [4 /*yield*/, deliverableMemo.wait()];
                case 6:
                    _a.sent();
                    console.log('✅ DeliverableMemo sent:', deliverableMemo.hash);
                    return [3 /*break*/, 8];
                case 7:
                    error_3 = _a.sent();
                    console.error('❌ Error publishing score:', error_3);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
// Track processed jobs to avoid duplicates
var processedJobs = new Set();
var lastCheckedBlock = 0;
function startAcpListener() {
    var _this = this;
    if (!sellerAgentAddress) {
        console.error('SELLER_AGENT_WALLET_ADDRESS environment variable is not set.');
        return;
    }
    console.log('🚀 Starting ACP listener for agent:', sellerAgentAddress);
    var provider = new ethers_1.JsonRpcProvider('https://sepolia.base.org', {
        name: 'base-sepolia',
        chainId: 84532
    });
    var jobOfferingContract = new ethers_1.Contract(jobOfferingAddress, JobOffer_ABI_1.default, provider);
    console.log('🎧 Listening for JobCreated events on contract:', jobOfferingAddress);
    // Initialize last checked block
    provider.getBlockNumber().then(function (blockNum) {
        lastCheckedBlock = blockNum;
        console.log("\uD83D\uDCCD Starting from block: ".concat(lastCheckedBlock));
    });
    // Poll for new events instead of using event listeners
    // This avoids filter expiration issues
    var pollInterval = 12000; // Poll every 12 seconds (Base block time)
    setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
        var currentBlock, fromBlock, toBlock, events, _i, events_1, event_1, _a, jobId, client, providerAddr, evaluator, jobKey, toRemove, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, provider.getBlockNumber()];
                case 1:
                    currentBlock = _b.sent();
                    // Only query if there are new blocks
                    if (currentBlock <= lastCheckedBlock) {
                        return [2 /*return*/];
                    }
                    fromBlock = lastCheckedBlock + 1;
                    toBlock = currentBlock;
                    return [4 /*yield*/, jobOfferingContract.queryFilter(jobOfferingContract.filters.JobCreated(), fromBlock, toBlock)];
                case 2:
                    events = _b.sent();
                    if (events.length > 0) {
                        console.log("\uD83D\uDCEC Found ".concat(events.length, " new job(s) in blocks ").concat(fromBlock, "-").concat(toBlock));
                        for (_i = 0, events_1 = events; _i < events_1.length; _i++) {
                            event_1 = events_1[_i];
                            _a = event_1.args, jobId = _a.jobId, client = _a.client, providerAddr = _a.provider, evaluator = _a.evaluator;
                            jobKey = "".concat(jobId.toString(), "-").concat(event_1.blockNumber);
                            // Skip if already processed
                            if (processedJobs.has(jobKey)) {
                                continue;
                            }
                            processedJobs.add(jobKey);
                            console.log('🎉 New job created!', {
                                jobId: jobId.toString(),
                                client: client,
                                provider: providerAddr,
                                evaluator: evaluator,
                                block: event_1.blockNumber
                            });
                            if (providerAddr.toLowerCase() === sellerAgentAddress.toLowerCase()) {
                                console.log('✅ This job is for me!');
                                // Handle job asynchronously
                                handleNewJob(jobId, jobOfferingContract).catch(function (error) {
                                    console.error('❌ Error handling job:', error.message);
                                });
                            }
                            else {
                                console.log('⏭️  Job is for another provider:', providerAddr);
                            }
                        }
                    }
                    lastCheckedBlock = currentBlock;
                    // Clean up old processed jobs (keep last 1000)
                    if (processedJobs.size > 1000) {
                        toRemove = Array.from(processedJobs).slice(0, processedJobs.size - 1000);
                        toRemove.forEach(function (key) { return processedJobs.delete(key); });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _b.sent();
                    console.error('⚠️  Polling error:', error_4.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, pollInterval);
    console.log('✅ ACP Listener initialized successfully (polling mode)');
}
