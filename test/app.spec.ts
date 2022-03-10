import { App, buildApp } from '../src/app';
import { buildConfig } from '../src/config';

describe('App', () => {
    let app: App;

    beforeEach(async () => {
        const config = buildConfig();
        app = await buildApp({
            ...config,
            log: {
                ...config.log,
                enabled: false
            }
        });
    });
    afterEach(async () => {
        await app.close();
    });

    const messageBody = {
        end_device_ids: {
            device_id: 'eui-70b3d57ed004ba62',
            application_ids: { application_id: 'geofinger-umu' },
            dev_eui: '70B3D57ED004BA62',
            join_eui: '0000000000000000',
            dev_addr: '260BDB27'
        },
        correlation_ids: [
            'as:up:01FT3RYETNRDCKQ4JE12BKQ1A3',
            'gs:conn:01FT1HXVXZZ62PJGRZXC07QFZ5',
            'gs:up:host:01FT1HXVYATJ3P3T20A8N14H5H',
            'gs:uplink:01FT3RYEKDRQTWS2WDCWWKVS8F',
            'ns:uplink:01FT3RYEKG6V72FCF5TF12KVKG',
            'rpc:/ttn.lorawan.v3.GsNs/HandleUplink:01FT3RYEKF0CGAQJNJD2XEK42S',
            'rpc:/ttn.lorawan.v3.NsAs/HandleUplink:01FT3RYETM558ETAAWTWH08F33'
        ],
        received_at: '2022-01-23T15:30:18.070899671Z',
        uplink_message: {
            session_key_id: 'AX6HfouRA6uD4M3R+AbNWw==',
            f_port: 1,
            f_cnt: 5,
            frm_payload: 'AQIDBQYHCA==',
            decoded_payload: { bytes: [1, 2, 3, 5, 6, 7, 8] },
            rx_metadata: [
                {
                    gateway_ids: {
                        gateway_id: 'juanjo-lora-murcia-pruebas-cobertura',
                        eui: '1234567887654321'
                    },
                    timestamp: 745988923,
                    rssi: -37,
                    channel_rssi: -37,
                    snr: 10.3,
                    location: {
                        latitude: 38.02784271204998,
                        longitude: -1.123655140399933,
                        source: 'SOURCE_REGISTRY'
                    },
                    uplink_token:
                        'CjIKMAokanVhbmpvLWxvcmEtbXVyY2lhLXBydWViYXMtY29iZXJ0dXJhEggSNFZ4h2VDIRC7xtvjAhoMCInptY8GEOCzw48DIPi8noPb3BI=',
                    channel_index: 2
                }
            ],
            settings: {
                data_rate: { lora: { bandwidth: 125000, spreading_factor: 7 } },
                coding_rate: '4/5',
                frequency: '868500000',
                timestamp: 745988923
            },
            received_at: '2022-01-23T15:30:17.840064387Z',
            confirmed: true,
            consumed_airtime: '0.056576s',
            network_ids: {
                net_id: '000013',
                tenant_id: 'ttn',
                cluster_id: 'ttn-eu1'
            }
        }
    };

    test('should return 404 when route not found', async () => {
        const response = await app
            .getServer()
            .inject({ method: 'GET', url: '/not-found-route' });

        expect(response.statusCode).toBe(404);
        const body = JSON.parse(response.body);
        expect(body).toEqual({
            error: 'Not Found',
            message: 'Route GET:/not-found-route not found',
            statusCode: 404
        });
    });

    test('should return 200 with basic homepage when route is /version', async () => {
        const expectedResponse = { version: '0.0.1' };
        const response = await app
            .getServer()
            .inject({ method: 'GET', url: '/version' });

        expect(response.statusCode).toBe(200);
        const body = JSON.parse(response.body);
        expect(body).toEqual(expectedResponse);
    });

    test('should return 200 with basic homepage when route is /message', async () => {
        const expectedResponse = { version: '0.0.1' };
        const requestBody = { message: 'Hello World' };
        const response = await app
            .getServer()
            .inject({ method: 'POST', url: '/message', payload: requestBody });

        expect(response.statusCode).toBe(200);
        const body = JSON.parse(response.body);
        expect(body).toEqual(expectedResponse);
    });

    test('should return 200 with basic homepage when route is /join', async () => {
        const expectedResponse = { version: '0.0.1' };
        const requestBody = { message: 'Hello World' };
        const response = await app
            .getServer()
            .inject({ method: 'POST', url: '/join', payload: requestBody });

        expect(response.statusCode).toBe(200);
        const body = JSON.parse(response.body);
        expect(body).toEqual(expectedResponse);
    });
});
