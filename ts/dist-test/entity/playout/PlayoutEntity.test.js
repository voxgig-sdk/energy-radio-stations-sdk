"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('PlayoutEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ENERGY_RADIO_STATIONS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ENERGY_RADIO_STATIONS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.EnergyRadioStationsSDK.test();
        const ent = testsdk.Playout();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ENERGY_RADIO_STATIONS_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'playout.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "album", "req": false, "short": "Album name", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "artist", "req": true, "short": "Artist name", "type": "`$STRING`", "index$": 1 }, { "active": true, "format": "uri", "name": "coverArt", "req": false, "short": "URL to album cover image", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "duration", "req": false, "short": "Song duration in seconds", "type": "`$INTEGER`", "index$": 3 }, { "active": true, "name": "id", "req": false, "short": "Unique identifier for the playlist entry", "type": "`$STRING`", "index$": 4 }, { "active": true, "format": "date-time", "name": "playedAt", "req": true, "short": "Timestamp when the song was played", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "title", "req": true, "short": "Song title", "type": "`$STRING`", "index$": 6 }], "id": { "field": "id", "name": "id" }, "name": "playout", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "energy-bern", "kind": "param", "name": "station", "orig": "station", "reqd": true, "type": "`$STRING`", "index$": 0 }], "query": [{ "active": true, "example": 20, "kind": "query", "name": "limit", "orig": "limit", "reqd": false, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /api/channels/{station}/playouts", "json": "{\"operationId\":\"getStationPlaylist\",\"parameters\":[{\"description\":\"The station identifier\",\"in\":\"path\",\"name\":\"station\",\"required\":true,\"schema\":{\"enum\":[\"energy-zurich\",\"energy-basel\",\"energy-bern\",\"energy-me-time\",\"energy-love\",\"energy-at-work\",\"energy-hits\",\"made-in-switzerland\",\"energy-workout\",\"energy-latin\",\"energy-party-vibes\",\"energy-summer-vibes\",\"energy-pop\",\"energy-top-30\",\"energy-90s\",\"energy-80s\",\"energy-00s\",\"energy-10s\",\"energy-dance\",\"energy-20s\",\"energy-italy\",\"energy-deutsch-pop\",\"energy-womxn\",\"energy-lounge\",\"friends-cooking\",\"energy-deutschrap\",\"energy-balkan-hits\",\"energy-rock\",\"energy-urban\",\"energy-x-mas\"],\"example\":\"energy-bern\",\"type\":\"string\"}},{\"description\":\"Number of playlist entries to return\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":20,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"playlist\":{\"items\":{\"properties\":{\"album\":{\"description\":\"Album name\",\"example\":\"25\",\"type\":\"string\"},\"artist\":{\"description\":\"Artist name\",\"example\":\"Adele\",\"type\":\"string\"},\"coverArt\":{\"description\":\"URL to album cover image\",\"format\":\"uri\",\"type\":\"string\"},\"duration\":{\"description\":\"Song duration in seconds\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique identifier for the playlist entry\",\"type\":\"string\"},\"playedAt\":{\"description\":\"Timestamp when the song was played\",\"format\":\"date-time\",\"type\":\"string\"},\"title\":{\"description\":\"Song title\",\"example\":\"Hello\",\"type\":\"string\"}},\"required\":[\"artist\",\"title\",\"playedAt\"],\"type\":\"object\"},\"type\":\"array\"},\"station\":{\"properties\":{\"description\":{\"example\":\"Die Nummer 1 aus der Hauptstadt.\",\"type\":\"string\"},\"frequency\":{\"example\":\"101.7 MHz\",\"type\":\"string\"},\"id\":{\"example\":\"energy-bern\",\"type\":\"string\"},\"name\":{\"example\":\"Energy Bern\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with playlist data\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Station not found\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/channels/{station}/playouts", "segments": [{ "lit": "api" }, { "lit": "channels" }, { "var": "station" }, { "lit": "playouts" }], "select": { "exist": ["limit", "station"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [["channel"]] }, "key$": "playout", "name__orig": "playout", "Name": "Playout", "name_": "playout", "name-": "playout", "NAME": "PLAYOUT", "index$": 0 }, { "active": true, "entity": "playout", "key$": "BasicPlayoutFlow", "kind": "basic", "name": "BasicPlayoutFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": { "station": "station01" }, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "playout_ref01" } }], "index$": 0 }] }, 'Playout');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let playout_ref01_data = Object.values(setup.data.existing.playout)[0];
        // LIST
        const playout_ref01_ent = client.Playout();
        const playout_ref01_match = {};
        playout_ref01_match['station'] = setup.idmap['station01'];
        const playout_ref01_list = (await playout_ref01_ent.list(playout_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/playout/PlayoutTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.EnergyRadioStationsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['playout01', 'playout02', 'playout03', 'channel01', 'channel02', 'channel03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ENERGY_RADIO_STATIONS_TEST_PLAYOUT_ENTID': idmap,
        'ENERGY_RADIO_STATIONS_TEST_LIVE': 'FALSE',
        'ENERGY_RADIO_STATIONS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['ENERGY_RADIO_STATIONS_TEST_PLAYOUT_ENTID'];
    const live = 'TRUE' === env.ENERGY_RADIO_STATIONS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ENERGY_RADIO_STATIONS_TEST_PLAYOUT_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.EnergyRadioStationsSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.ENERGY_RADIO_STATIONS_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=PlayoutEntity.test.js.map