import {
  pageArrayFromDict, checkParams, appInfoFromDict, getDebuggerAppKey, getPossibleDebuggerAppKeys
} from '../../lib/utils';
import _ from 'lodash';
import { MOCHA_TIMEOUT } from '../helpers/helpers';

describe('utils', function () {
  this.timeout(MOCHA_TIMEOUT);
  let chai;
  let expect;

  before(async function () {
    chai = await import('chai');
    const chaiAsPromised = await import('chai-as-promised');
    chai.should();
    chai.use(chaiAsPromised.default);
    expect = chai.expect;
  });

  describe('appInfoFromDict', function () {
    it('should return the id and entry for a dict', function () {
      let dict = {
        WIRApplicationIdentifierKey: '42',
        WIRApplicationNameKey: 'App Name',
        WIRApplicationBundleIdentifierKey: 'app.name',
        WIRIsApplicationProxyKey: 'false',
        WIRHostApplicationIdentifierKey: '43'
      };
      let [id, entry] = appInfoFromDict(dict);
      id.should.equal(dict.WIRApplicationIdentifierKey);
      entry.id.should.equal(dict.WIRApplicationIdentifierKey);
      entry.name.should.equal(dict.WIRApplicationNameKey);
      entry.bundleId.should.equal(dict.WIRApplicationBundleIdentifierKey);
      entry.isProxy.should.equal(dict.WIRIsApplicationProxyKey === 'true');
      entry.hostId.should.equal(dict.WIRHostApplicationIdentifierKey);
    });
  });
  describe('getDebuggerAppKey', function () {
    it('should return the app key for the bundle', function () {
      let appDict = {
        ['42']: {
          bundleId: 'io.appium.bundle'
        }
      };
      getDebuggerAppKey('io.appium.bundle', appDict).should.equal('42');
    });
    it('should return the app key for the bundle when proxied', function () {
      let appDict = {
        ['42']: {
          bundleId: 'io.appium.bundle',
          isProxy: false
        },
        ['43']: {
          bundleId: 'io.appium.proxied.bundle',
          isProxy: true,
          hostId: '42'
        }
      };
      getDebuggerAppKey('io.appium.bundle', appDict).should.equal('43');
    });
    it('should return undefined when there is no appropriate app', function () {
      expect(getDebuggerAppKey('io.appium.bundle', {})).to.not.exist;
    });
  });
  describe('getPossibleDebuggerAppKeys', function () {
    it('should return the app key of the specified bundleIds', function () {
      const appDict = {
        ['42']: {
          bundleId: 'io.appium.bundle1'
        },
        ['43']: {
          bundleId: 'io.appium.bundle2'
        },
      };
      expect(getPossibleDebuggerAppKeys(['io.appium.bundle1'], appDict)).to.eql(['42']);
    });
    const webviewBundleIds = [
      'com.apple.WebKit.WebContent',
      'process-com.apple.WebKit.WebContent',
      'process-SafariViewService',
      'com.apple.SafariViewService',
      '*',
    ];
    for (const webviewBundleId of webviewBundleIds) {
      it(`should return the app key of ${webviewBundleId}`, function () {
        const appDict = {
          ['42']: {
            bundleId: webviewBundleId
          }
        };
        expect(getPossibleDebuggerAppKeys([], appDict)).to.eql(['42']);
      });
    }
    it('should return the app key for the bundleIds when proxied', function () {
      const appDict = {
        ['42']: {
          bundleId: 'io.appium.bundle',
          isProxy: false
        },
        ['43']: {
          bundleId: 'io.appium.proxied.bundle',
          isProxy: true,
          hostId: '42'
        }
      };
      expect(getPossibleDebuggerAppKeys(['io.appium.bundle'], appDict)).to.eql(['42', '43']);
    });
    it('should return an empty array when there is no appropriate app', function () {
      expect(getPossibleDebuggerAppKeys('io.appium.bundle', {})).to.eql([]);
    });
    it('should return the all app keys when the bundlIds array includes a wildcard', function () {
      const appDict = {
        ['42']: {
          bundleId: 'io.appium.bundle1'
        },
        ['43']: {
          bundleId: 'io.appium.bundle2'
        },
      };
      expect(getPossibleDebuggerAppKeys(['*'], appDict)).to.eql(['42', '43']);
    });
  });
  describe('pageArrayFromDict', function () {
    let basePageDict = {
      1: {
        WIRTitleKey: 'Appium/welcome',
        WIRTypeKey: 'WIRTypeWeb',
        WIRURLKey: 'http://127.0.0.1:4723/welcome',
        WIRPageIdentifierKey: 1,
        WIRConnectionIdentifierKey: 'e777f792-c41e-4e5d-8722-68393af663b2'
      }
    };
    it('should return a valid page array', function () {
      let pageArray = pageArrayFromDict(basePageDict);
      pageArray.should.have.length(1);
    });
    it('should return a valid page array with 13.4-style type key', function () {
      const pageDict = _.defaults({
        2: {
          WIRTypeKey: 'WIRTypeWebPage'
        }
      }, basePageDict);
      const pageArray = pageArrayFromDict(pageDict);
      pageArray.should.have.length(2);
    });
    it('should not count WIRTypeWeb entries', function () {
      let pageDict = _.defaults({
        2: {
          WIRTypeKey: 'WIRTypeJavaScript'
        }
      }, basePageDict);
      let pageArray = pageArrayFromDict(pageDict);
      pageArray.should.have.length(1);
    });
  });
  describe('checkParams', function () {
    it('should not throw error when not missing parameters', function () {
      checkParams({one: 'first', two: 'second', three: 'third'});
    });
    it('should throw error when parameter is missing', function () {
      expect(() => checkParams({one: 'first', two: null, three: 'third'})).to.throw('Missing parameter: two');
    });
  });
});
