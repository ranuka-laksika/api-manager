# Fix for Issue #15: API count is not updating when an API is deleted

## Problem
When deleting an API from the publisher portal, the API count in the listing page was not updating properly. The total count displayed would remain the same even after successful API deletion.

## Root Cause
The issue was in `DeleteButton.jsx` at line 195 where `updateData(id)` was being called with an `id` parameter, but the `updateData` method in `TableView.jsx` expects no parameters.

## Solution
Changed line 195 in `DeleteButton.jsx` from:
```javascript
updateData(id);
```
to:
```javascript
updateData();
```

## Files Modified
- `apim-apps/portals/publisher/src/main/webapp/source/src/app/components/Apis/Listing/components/ImageGenerator/APICards/DeleteButton.jsx` (line 195)

## Build Artifacts
- Built using `mvn clean install`
- Generated WAR files successfully:
  - publisher.war
  - devportal.war
  - admin.war
- WAR files replaced in wso2am-4.6.0-rc2 pack
- Created `wso2am-4.6.0-rc2-issue-15.zip` with the fixed WAR files

## Testing
This is a frontend repository, so no backend testing is required per the workflow guidelines.

## Related Issues
- Similar issue found in wso2/api-manager#4439 with identical symptoms