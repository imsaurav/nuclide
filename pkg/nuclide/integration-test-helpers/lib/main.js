

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

var _event = require('./event');

var _fixtures = require('./fixtures');

var _flowUtils = require('./flow-utils');

var _packageUtils = require('./package-utils');

var _remoteUtils = require('./remote-utils');

module.exports = {
  activateAllPackages: _packageUtils.activateAllPackages,
  addRemoteProject: _remoteUtils.addRemoteProject,
  copyFixture: _fixtures.copyFixture,
  copyMercurialFixture: _fixtures.copyMercurialFixture,
  deactivateAllPackages: _packageUtils.deactivateAllPackages,
  dispatchKeyboardEvent: _event.dispatchKeyboardEvent,
  setLocalProject: _fixtures.setLocalProject,
  startFlowServer: _flowUtils.startFlowServer,
  stopFlowServer: _flowUtils.stopFlowServer,
  startNuclideServer: _remoteUtils.startNuclideServer,
  stopNuclideServer: _remoteUtils.stopNuclideServer
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztxQkFXb0MsU0FBUzs7d0JBQ29CLFlBQVk7O3lCQUMvQixjQUFjOzs0QkFDSCxpQkFBaUI7OzJCQUNKLGdCQUFnQjs7QUFFdEYsTUFBTSxDQUFDLE9BQU8sR0FBRztBQUNmLHFCQUFtQixtQ0FBQTtBQUNuQixrQkFBZ0IsK0JBQUE7QUFDaEIsYUFBVyx1QkFBQTtBQUNYLHNCQUFvQixnQ0FBQTtBQUNwQix1QkFBcUIscUNBQUE7QUFDckIsdUJBQXFCLDhCQUFBO0FBQ3JCLGlCQUFlLDJCQUFBO0FBQ2YsaUJBQWUsNEJBQUE7QUFDZixnQkFBYywyQkFBQTtBQUNkLG9CQUFrQixpQ0FBQTtBQUNsQixtQkFBaUIsZ0NBQUE7Q0FDbEIsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG4vKiBAZmxvdyAqL1xuXG4vKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIGxpY2Vuc2UgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpblxuICogdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IHtkaXNwYXRjaEtleWJvYXJkRXZlbnR9IGZyb20gJy4vZXZlbnQnO1xuaW1wb3J0IHtjb3B5Rml4dHVyZSwgY29weU1lcmN1cmlhbEZpeHR1cmUsIHNldExvY2FsUHJvamVjdH0gZnJvbSAnLi9maXh0dXJlcyc7XG5pbXBvcnQge3N0YXJ0Rmxvd1NlcnZlciwgc3RvcEZsb3dTZXJ2ZXJ9IGZyb20gJy4vZmxvdy11dGlscyc7XG5pbXBvcnQge2FjdGl2YXRlQWxsUGFja2FnZXMsIGRlYWN0aXZhdGVBbGxQYWNrYWdlc30gZnJvbSAnLi9wYWNrYWdlLXV0aWxzJztcbmltcG9ydCB7YWRkUmVtb3RlUHJvamVjdCwgc3RhcnROdWNsaWRlU2VydmVyLCBzdG9wTnVjbGlkZVNlcnZlcn0gZnJvbSAnLi9yZW1vdGUtdXRpbHMnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWN0aXZhdGVBbGxQYWNrYWdlcyxcbiAgYWRkUmVtb3RlUHJvamVjdCxcbiAgY29weUZpeHR1cmUsXG4gIGNvcHlNZXJjdXJpYWxGaXh0dXJlLFxuICBkZWFjdGl2YXRlQWxsUGFja2FnZXMsXG4gIGRpc3BhdGNoS2V5Ym9hcmRFdmVudCxcbiAgc2V0TG9jYWxQcm9qZWN0LFxuICBzdGFydEZsb3dTZXJ2ZXIsXG4gIHN0b3BGbG93U2VydmVyLFxuICBzdGFydE51Y2xpZGVTZXJ2ZXIsXG4gIHN0b3BOdWNsaWRlU2VydmVyLFxufTtcbiJdfQ==