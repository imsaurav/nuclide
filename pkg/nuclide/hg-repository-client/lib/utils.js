

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

var path = require('path');

var ensureTrailingSeparator = require('../../commons').paths.ensureTrailingSeparator;

var ADD_ACTION = 'add';
var REMOVE_ACTION = 'remove';

var separatorRegex = new RegExp('\\' + path.sep, 'g');

/**
 * This function takes in a file path, and computes all directories that would
 * be considered a parent of it, i.e., the file path is contained by all of these
 * directories. The function sets the directories (terminated by a separator) as
 * keys in the `directories` Map, and bumps the value accordingly.
 * @param directories The Map that will be modified by this function. The keys are
 *   expected to be directory paths (terminated by a separator) and the values are
 *   the number of times this directory path has been 'added' to this Map.
 * @param modifiedPath A file path (assumed to not have a trailing separator).
 * @param pathPrefixToSkip Optionally, a string that, if found at the beginning
 *   of the modifiedPath, will be skipped when computing the parent directories.
 *   That is, if modifiedPath is /A/B/C/D and pathPrefixToSkip is /A/B/ (or /A/B),
 *   `directories` will be populated with '/A/B/C/', but not '/A/' or '/A/B/'.
 */
function addAllParentDirectoriesToCache(directories, modifiedPath, pathPrefixToSkip) {
  computeAllParentDirectories(directories, modifiedPath, pathPrefixToSkip, ADD_ACTION);
}

/**
 * Like `addAllParentDirectoriesToCache`, except it removes all parent directories.
 */
function removeAllParentDirectoriesFromCache(directories, modifiedPath, pathPrefixToSkip) {
  computeAllParentDirectories(directories, modifiedPath, pathPrefixToSkip, REMOVE_ACTION);
}

/**
 * Helper function to `addAllParentDirectoriesToCache` and
 * `removeAllParentDirectoriesFromCach`. Either adds or removes the computed
 * parent directories depending on the operation passed in.
 */
function computeAllParentDirectories(directories, modifiedPath, pathPrefixToSkip, operation) {
  // Reset the regex so it will start the next search at the beginning of the string.
  separatorRegex.lastIndex = 0;

  if (pathPrefixToSkip) {
    // Setting the lastIndex determines where the next search begins.
    separatorRegex.lastIndex = ensureTrailingSeparator(pathPrefixToSkip).length;
  }

  var shouldAdd = operation === ADD_ACTION;
  var match = undefined;
  while (match = separatorRegex.exec(modifiedPath)) {
    var newSubPath = modifiedPath.slice(0, match.index + 1);
    if (shouldAdd) {
      addItemToCache(newSubPath, directories);
    } else {
      removeItemFromCache(newSubPath, directories);
    }
  }
}

function addItemToCache(item, cache) {
  var existingValue = cache.get(item);
  if (existingValue) {
    cache.set(item, existingValue + 1);
  } else {
    cache.set(item, 1);
  }
}

function removeItemFromCache(item, cache) {
  var existingValue = cache.get(item);
  if (existingValue) {
    var newValue = existingValue - 1;
    if (newValue > 0) {
      cache.set(item, newValue);
    } else {
      cache['delete'](item);
    }
  }
}

module.exports = {
  addAllParentDirectoriesToCache: addAllParentDirectoriesToCache,
  removeAllParentDirectoriesFromCache: removeAllParentDirectoriesFromCache
};
//# sourceMappingURL=data:application/json;base64,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LENBQUMiLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcbi8qIEBmbG93ICovXG5cbi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgbGljZW5zZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluXG4gKiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuY29uc3Qge2Vuc3VyZVRyYWlsaW5nU2VwYXJhdG9yfSA9IHJlcXVpcmUoJy4uLy4uL2NvbW1vbnMnKS5wYXRocztcblxuY29uc3QgQUREX0FDVElPTiA9ICdhZGQnO1xuY29uc3QgUkVNT1ZFX0FDVElPTiA9ICdyZW1vdmUnO1xudHlwZSBEaXJlY3Rvcmllc0NhY2hlT3BlcmF0aW9uID0gJ2FkZCcgfCAncmVtb3ZlJztcblxuY29uc3Qgc2VwYXJhdG9yUmVnZXggPSBuZXcgUmVnRXhwKCdcXFxcJyArIHBhdGguc2VwLCAnZycpO1xuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gdGFrZXMgaW4gYSBmaWxlIHBhdGgsIGFuZCBjb21wdXRlcyBhbGwgZGlyZWN0b3JpZXMgdGhhdCB3b3VsZFxuICogYmUgY29uc2lkZXJlZCBhIHBhcmVudCBvZiBpdCwgaS5lLiwgdGhlIGZpbGUgcGF0aCBpcyBjb250YWluZWQgYnkgYWxsIG9mIHRoZXNlXG4gKiBkaXJlY3Rvcmllcy4gVGhlIGZ1bmN0aW9uIHNldHMgdGhlIGRpcmVjdG9yaWVzICh0ZXJtaW5hdGVkIGJ5IGEgc2VwYXJhdG9yKSBhc1xuICoga2V5cyBpbiB0aGUgYGRpcmVjdG9yaWVzYCBNYXAsIGFuZCBidW1wcyB0aGUgdmFsdWUgYWNjb3JkaW5nbHkuXG4gKiBAcGFyYW0gZGlyZWN0b3JpZXMgVGhlIE1hcCB0aGF0IHdpbGwgYmUgbW9kaWZpZWQgYnkgdGhpcyBmdW5jdGlvbi4gVGhlIGtleXMgYXJlXG4gKiAgIGV4cGVjdGVkIHRvIGJlIGRpcmVjdG9yeSBwYXRocyAodGVybWluYXRlZCBieSBhIHNlcGFyYXRvcikgYW5kIHRoZSB2YWx1ZXMgYXJlXG4gKiAgIHRoZSBudW1iZXIgb2YgdGltZXMgdGhpcyBkaXJlY3RvcnkgcGF0aCBoYXMgYmVlbiAnYWRkZWQnIHRvIHRoaXMgTWFwLlxuICogQHBhcmFtIG1vZGlmaWVkUGF0aCBBIGZpbGUgcGF0aCAoYXNzdW1lZCB0byBub3QgaGF2ZSBhIHRyYWlsaW5nIHNlcGFyYXRvcikuXG4gKiBAcGFyYW0gcGF0aFByZWZpeFRvU2tpcCBPcHRpb25hbGx5LCBhIHN0cmluZyB0aGF0LCBpZiBmb3VuZCBhdCB0aGUgYmVnaW5uaW5nXG4gKiAgIG9mIHRoZSBtb2RpZmllZFBhdGgsIHdpbGwgYmUgc2tpcHBlZCB3aGVuIGNvbXB1dGluZyB0aGUgcGFyZW50IGRpcmVjdG9yaWVzLlxuICogICBUaGF0IGlzLCBpZiBtb2RpZmllZFBhdGggaXMgL0EvQi9DL0QgYW5kIHBhdGhQcmVmaXhUb1NraXAgaXMgL0EvQi8gKG9yIC9BL0IpLFxuICogICBgZGlyZWN0b3JpZXNgIHdpbGwgYmUgcG9wdWxhdGVkIHdpdGggJy9BL0IvQy8nLCBidXQgbm90ICcvQS8nIG9yICcvQS9CLycuXG4gKi9cbmZ1bmN0aW9uIGFkZEFsbFBhcmVudERpcmVjdG9yaWVzVG9DYWNoZShcbiAgICBkaXJlY3RvcmllczogTWFwPHN0cmluZywgbnVtYmVyPixcbiAgICBtb2RpZmllZFBhdGg6IHN0cmluZyxcbiAgICBwYXRoUHJlZml4VG9Ta2lwOiA/c3RyaW5nXG4gICkge1xuICBjb21wdXRlQWxsUGFyZW50RGlyZWN0b3JpZXMoXG4gICAgZGlyZWN0b3JpZXMsXG4gICAgbW9kaWZpZWRQYXRoLFxuICAgIHBhdGhQcmVmaXhUb1NraXAsXG4gICAgQUREX0FDVElPTlxuICApO1xufVxuXG4vKipcbiAqIExpa2UgYGFkZEFsbFBhcmVudERpcmVjdG9yaWVzVG9DYWNoZWAsIGV4Y2VwdCBpdCByZW1vdmVzIGFsbCBwYXJlbnQgZGlyZWN0b3JpZXMuXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUFsbFBhcmVudERpcmVjdG9yaWVzRnJvbUNhY2hlKFxuICAgIGRpcmVjdG9yaWVzOiBNYXA8c3RyaW5nLCBudW1iZXI+LFxuICAgIG1vZGlmaWVkUGF0aDogc3RyaW5nLFxuICAgIHBhdGhQcmVmaXhUb1NraXA6ID9zdHJpbmdcbiAgKSB7XG4gIGNvbXB1dGVBbGxQYXJlbnREaXJlY3RvcmllcyhcbiAgICBkaXJlY3RvcmllcyxcbiAgICBtb2RpZmllZFBhdGgsXG4gICAgcGF0aFByZWZpeFRvU2tpcCxcbiAgICBSRU1PVkVfQUNUSU9OXG4gICk7XG59XG5cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gYGFkZEFsbFBhcmVudERpcmVjdG9yaWVzVG9DYWNoZWAgYW5kXG4gKiBgcmVtb3ZlQWxsUGFyZW50RGlyZWN0b3JpZXNGcm9tQ2FjaGAuIEVpdGhlciBhZGRzIG9yIHJlbW92ZXMgdGhlIGNvbXB1dGVkXG4gKiBwYXJlbnQgZGlyZWN0b3JpZXMgZGVwZW5kaW5nIG9uIHRoZSBvcGVyYXRpb24gcGFzc2VkIGluLlxuICovXG5mdW5jdGlvbiBjb21wdXRlQWxsUGFyZW50RGlyZWN0b3JpZXMoXG4gICAgZGlyZWN0b3JpZXM6IE1hcDxzdHJpbmcsIG51bWJlcj4sXG4gICAgbW9kaWZpZWRQYXRoOiBzdHJpbmcsXG4gICAgcGF0aFByZWZpeFRvU2tpcDogP3N0cmluZyxcbiAgICBvcGVyYXRpb246IERpcmVjdG9yaWVzQ2FjaGVPcGVyYXRpb25cbiAgKSB7XG4gIC8vIFJlc2V0IHRoZSByZWdleCBzbyBpdCB3aWxsIHN0YXJ0IHRoZSBuZXh0IHNlYXJjaCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBzdHJpbmcuXG4gIHNlcGFyYXRvclJlZ2V4Lmxhc3RJbmRleCA9IDA7XG5cbiAgaWYgKHBhdGhQcmVmaXhUb1NraXApIHtcbiAgICAvLyBTZXR0aW5nIHRoZSBsYXN0SW5kZXggZGV0ZXJtaW5lcyB3aGVyZSB0aGUgbmV4dCBzZWFyY2ggYmVnaW5zLlxuICAgIHNlcGFyYXRvclJlZ2V4Lmxhc3RJbmRleCA9IGVuc3VyZVRyYWlsaW5nU2VwYXJhdG9yKHBhdGhQcmVmaXhUb1NraXApLmxlbmd0aDtcbiAgfVxuXG4gIGNvbnN0IHNob3VsZEFkZCA9IChvcGVyYXRpb24gPT09IEFERF9BQ1RJT04pO1xuICBsZXQgbWF0Y2g7XG4gIHdoaWxlICgobWF0Y2ggPSBzZXBhcmF0b3JSZWdleC5leGVjKG1vZGlmaWVkUGF0aCkpKSB7XG4gICAgY29uc3QgbmV3U3ViUGF0aCA9IG1vZGlmaWVkUGF0aC5zbGljZSgwLCBtYXRjaC5pbmRleCArIDEpO1xuICAgIGlmIChzaG91bGRBZGQpIHtcbiAgICAgIGFkZEl0ZW1Ub0NhY2hlKG5ld1N1YlBhdGgsIGRpcmVjdG9yaWVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlSXRlbUZyb21DYWNoZShuZXdTdWJQYXRoLCBkaXJlY3Rvcmllcyk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFkZEl0ZW1Ub0NhY2hlKGl0ZW06IHN0cmluZywgY2FjaGU6IE1hcDxzdHJpbmcsIG51bWJlcj4pIHtcbiAgY29uc3QgZXhpc3RpbmdWYWx1ZSA9IGNhY2hlLmdldChpdGVtKTtcbiAgaWYgKGV4aXN0aW5nVmFsdWUpIHtcbiAgICBjYWNoZS5zZXQoaXRlbSwgZXhpc3RpbmdWYWx1ZSArIDEpO1xuICB9IGVsc2Uge1xuICAgIGNhY2hlLnNldChpdGVtLCAxKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVJdGVtRnJvbUNhY2hlKGl0ZW06IHN0cmluZywgY2FjaGU6IE1hcDxzdHJpbmcsIG51bWJlcj4pIHtcbiAgY29uc3QgZXhpc3RpbmdWYWx1ZSA9IGNhY2hlLmdldChpdGVtKTtcbiAgaWYgKGV4aXN0aW5nVmFsdWUpIHtcbiAgICBjb25zdCBuZXdWYWx1ZSA9IGV4aXN0aW5nVmFsdWUgLSAxO1xuICAgIGlmIChuZXdWYWx1ZSA+IDApIHtcbiAgICAgIGNhY2hlLnNldChpdGVtLCBuZXdWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhY2hlLmRlbGV0ZShpdGVtKTtcbiAgICB9XG4gIH1cbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWRkQWxsUGFyZW50RGlyZWN0b3JpZXNUb0NhY2hlLFxuICByZW1vdmVBbGxQYXJlbnREaXJlY3Rvcmllc0Zyb21DYWNoZSxcbn07XG4iXX0=