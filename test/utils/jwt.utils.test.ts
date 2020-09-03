import { getAccessTokenPayload, getRefreshTokenPayload } from '../../src/common/utils/jwt.utils';

describe('JWT Utils', () => {

    it('Should contain sub and exp fields when generating access token', () => {
        const accessTokenPayload = getAccessTokenPayload();

        expect(Object.keys(accessTokenPayload).length).toEqual(2);
    });

    it('Should contain exp field when generating refresh token', () => {
        const refreshTokenPayload = getRefreshTokenPayload();

        expect(Object.keys(refreshTokenPayload).length).toEqual(1);
    });

});
