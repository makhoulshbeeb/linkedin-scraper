"use strict";
/**
 * Example call to fetch the member profile for the authorized member.
 * The 3-legged member access token should include the 'r_liteprofile' scope, which
 * is part of the Sign In With LinkedIn API product.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const linkedin_api_client_1 = require("linkedin-api-client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '/linkedin.env' });
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const restliClient = new linkedin_api_client_1.RestliClient();
        restliClient.setDebugParams({ enabled: true });
        const accessToken = process.env.ACCESS_TOKEN || '';
        /**
         * Basic usage
         */
        let response = yield restliClient.get({
            resourcePath: '/me',
            accessToken
        });
        console.log('Basic usage:', response.data);
        /**
         * With field projection to limit fields returned
         */
        response = yield restliClient.get({
            resourcePath: '/me',
            queryParams: {
                fields: 'id,firstName,lastName'
            },
            accessToken
        });
        console.log('With field projections:', response.data);
        /**
         * With decoration of displayImage
         */
        response = yield restliClient.get({
            resourcePath: '/me',
            queryParams: {
                projection: '(id,firstName,lastName,profilePicture(displayImage~:playableStreams))'
            },
            accessToken
        });
        console.log('With decoration:', response.data);
    });
}
main()
    .then(() => {
    console.log('Completed');
})
    .catch((error) => {
    console.log(`Error encountered: ${error.message}`);
});
//# sourceMappingURL=get-profile.js.map