# Fix for Issue #38: GraphQL API Rate Limiting UI Bug

## Issue Description
When changing from operation level rate limiting to API level rate limiting for a GraphQL API, operation level rate limiting selection drop downs are not disabled. However after selecting a API level policy those dropdowns get disabled.

## Root Cause
The `isOperationRateLimiting` prop was using a truthy check (`!apiThrottlingPolicy`) which evaluates to true for any falsy value (null, undefined, empty string, etc.), causing incorrect behavior.

## Solution
Changed the condition from `!apiThrottlingPolicy` to `apiThrottlingPolicy === null` to explicitly check if no API-level throttling policy is selected.

## Files Modified

### File: Operations.jsx
**Path:** `wso2am-4.6.0/repository/deployment/server/webapps/publisher/source/src/app/components/Apis/Details/Operations/Operations.jsx`

**Line:** 474

**Change:**
```jsx
// Before
isOperationRateLimiting={!apiThrottlingPolicy}

// After
isOperationRateLimiting={apiThrottlingPolicy === null}
```

## Build Process
1. Modified the Operations.jsx file in the publisher portal source
2. Ran `npm ci` to install dependencies
3. Ran `npm run build:prod` to rebuild the publisher portal
4. Generated new bundle files in `site/public/dist/`

## Testing
This is a frontend change. The fix ensures that when API-level rate limiting is selected (apiThrottlingPolicy is not null), the operation-level rate limiting dropdowns are properly disabled.

## Modified Pack
The complete modified wso2am-4.6.0 pack has been created as `wso2am-4.6.0-issue-38.zip` (723MB).

## Affected Repository
- **Repository:** apim-apps (Publisher Portal)
- **Component:** API Operations UI
- **File Type:** React Component (JSX)
