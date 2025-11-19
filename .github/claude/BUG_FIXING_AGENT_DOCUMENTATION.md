# WSO2 API Manager Bug Fixing AI Agent Documentation

## Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [How It Works](#how-it-works)
- [Setup and Configuration](#setup-and-configuration)
- [Workflow Execution](#workflow-execution)
- [System Prompt Breakdown](#system-prompt-breakdown)
- [Usage Guide](#usage-guide)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

---

## Overview

The WSO2 API Manager Bug Fixing AI Agent is an automated system that uses Claude AI (Anthropic) to automatically fix bugs in the WSO2 API Manager ecosystem. When triggered via GitHub issue comments, it:

1. Analyzes the reported bug
2. Searches for similar resolved issues
3. Applies appropriate fixes to the codebase
4. Builds and tests the solution
5. Creates a pull request with the fixed code
6. Uploads the modified WSO2AM pack as an artifact

### Key Features

- **Automated Bug Resolution**: Fixes bugs without manual intervention
- **Multi-Repository Support**: Handles frontend (apim-apps) and backend (carbon-apimgt, product-apim) repositories
- **Intelligent Fix Discovery**: Learns from previously closed issues
- **Full Build Pipeline**: Compiles, packages, and deploys fixes
- **Artifact Management**: Generates ready-to-use WSO2AM packs
- **Pull Request Automation**: Creates detailed PRs with fix descriptions

---

## Architecture

### Components

```
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Issue (Bug Report)                 │
│              Comment: @wso2-engineering-bot                  │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              GitHub Actions Workflow Triggered               │
│                  (claude_runner.yml)                         │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                Environment Setup Phase                       │
│  • Java 11 (Temurin)                                        │
│  • Maven 3.6.3                                              │
│  • Node.js (LTS)                                            │
│  • Download WSO2AM Pack (Latest Release)                    │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│            System Prompt Preparation                         │
│  • Load: system_prompt_update_v2.txt                        │
│  • Inject environment variables                             │
│  • Pass to Claude AI                                        │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                 Claude AI Execution                          │
│  Model: claude-sonnet-4-5-20250929                          │
│  Tools: Bash, Git, Web Search, GitHub MCP                   │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Bug Fixing Process                        │
│  1. Analyze Issue                                           │
│  2. Research Solution                                       │
│  3. Clone Repository                                        │
│  4. Apply Fix                                               │
│  5. Build Component                                         │
│  6. Replace Artifacts in WSO2AM Pack                        │
│  7. Test (Backend only)                                     │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Output Generation                          │
│  • Create Pull Request                                      │
│  • Zip Modified WSO2AM Pack                                 │
│  • Upload as GitHub Actions Artifact                        │
└─────────────────────────────────────────────────────────────┘
```

### File Structure

```
api-manager/
├── .github/
│   ├── workflows/
│   │   └── claude_runner.yml          # GitHub Actions workflow
│   └── claude/
│       └── system_prompt_update_v2.txt # AI agent instructions
```

---

## How It Works

### Trigger Mechanism

The agent is triggered when someone comments `@wso2-engineering-bot` on a GitHub issue.

**Workflow Configuration:**
```yaml
on:
  issue_comment:
    types: [created]
```

**Condition Check:**
```yaml
if: contains(github.event.comment.body, '@wso2-engineering-bot')
```

### Execution Flow

#### Phase 1: Environment Setup

1. **Checkout Repository**
   - Fetches the main repository code

2. **Install Build Tools**
   - Java 11 (Temurin distribution)
   - Maven 3.6.3
   - Node.js (latest LTS)

3. **Download WSO2AM Pack**
   - Fetches the latest WSO2 API Manager release
   - Extracts the pack to workspace
   - Sets `WSO2AM_VERSION` environment variable

4. **Configure Git**
   - Sets up Git credentials for commits
   - Configures user name and email

#### Phase 2: Claude AI Invocation

The workflow uses the `anthropics/claude-code-action@v1` to invoke Claude AI with:

**Key Parameters:**
- **Model**: `claude-sonnet-4-5-20250929` (Claude Sonnet 4.5)
- **System Prompt**: Dynamically generated from `system_prompt_update_v2.txt`
- **Allowed Tools**: Bash commands, file operations, web access, GitHub MCP

**Environment Variables Passed:**
```bash
ISSUE_NUMBER      # GitHub issue number
REPOSITORY        # Target repository name
GITHUB_TOKEN      # Authentication token
GITHUB_RUN_ID     # Workflow run ID
WSO2AM_VERSION    # Downloaded WSO2AM version
JAVA_HOME         # Java installation path
MAVEN_HOME        # Maven installation path
```

#### Phase 3: Bug Fixing Process (Executed by Claude)

The AI follows a structured 6-phase approach defined in the system prompt:

**PHASE 1: Understand the Issue**
- Read issue description and ALL comments
- Analyze screenshots (if present)
- Determine if frontend or backend issue
- Identify affected repository

**PHASE 2: Find the Solution**
- Check if issue provides explicit fix instructions
- Search for similar CLOSED issues in the repository
- Review merged PRs from those closed issues
- Adapt solution patterns to current issue

**PHASE 3: Apply the Fix**
- Clone the affected repository
- Create a timestamped branch
- Make targeted code changes
- No unnecessary files created

**PHASE 4: Build and Deploy**
- Build ONLY the modified component (not entire repo)
- Generate artifacts (.jar for backend, .war for frontend)
- Replace artifacts in WSO2AM pack:
  - **Frontend**: Replace .war files in `webapps/`
  - **Backend**: Create patch folder with .jar files

**PHASE 5: Test and Validate**
- **Frontend**: No testing required
- **Backend**: Start pack, test fix, retry if needed

**PHASE 6: Create PR and Upload**
- Commit changes to timestamped branch
- Push to remote repository
- Create detailed pull request
- Zip and upload modified WSO2AM pack

#### Phase 4: Artifact Upload

After Claude completes, the workflow:
1. Verifies the modified WSO2AM pack location
2. Uploads the pack as a GitHub Actions artifact
3. Makes it available for download from the Actions tab

---

## Setup and Configuration

### Prerequisites

1. **GitHub Repository**
   - Forked WSO2 API Manager repositories
   - GitHub Actions enabled

2. **Required Secrets**
   Configure these in GitHub Settings → Secrets and Variables → Actions:

   | Secret Name | Description | Example |
   |-------------|-------------|---------|
   | `DOC_FIXING_AGENT_GITHUB_TOKEN` | GitHub personal access token with repo permissions | `ghp_xxxxxxxxxxxx` |
   | `DOC_FIXING_AGENT_ANTHROPIC_API_KEY` | Anthropic API key for Claude AI | `sk-ant-xxxxxxxxxxxx` |
   | `DOC_FIXING_AGENT_GIT_USER_NAME` | Git commit author name | `ranuka-laksika` |
   | `DOC_FIXING_AGENT_GIT_USER_EMAIL` | Git commit author email | `ranukalaksika@gmail.com` |

3. **Required Variables**
   Configure these in GitHub Settings → Secrets and Variables → Actions → Variables:

   | Variable Name | Description | Example |
   |---------------|-------------|---------|
   | `DOC_FIXING_AGENT_REPOSITORY` | Target repository name | `api-manager` |

### Installation Steps

1. **Copy Workflow File**
   ```bash
   mkdir -p .github/workflows
   cp claude_runner.yml .github/workflows/
   ```

2. **Copy System Prompt**
   ```bash
   mkdir -p .github/claude
   cp system_prompt_update_v2.txt .github/claude/
   ```

3. **Configure Secrets**
   - Go to GitHub repository settings
   - Add all required secrets and variables

4. **Test the Setup**
   - Create a test issue
   - Comment `@wso2-engineering-bot`
   - Check Actions tab for workflow execution

---

## Workflow Execution

### Workflow File Breakdown (`claude_runner.yml`)

#### Trigger Configuration

```yaml
on:
  issue_comment:
    types: [created]
  schedule:
    - cron: '0 * * * *'  # Hourly check (optional)

concurrency:
  group: bug-fixing-ai-agent
  cancel-in-progress: false  # Ensure sequential execution
```

**Key Features:**
- Triggers on new issue comments
- Optional hourly scheduled runs
- Prevents concurrent executions

#### Environment Setup Steps

**Step 1: Checkout Repository**
```yaml
- name: Checkout original repository
  uses: actions/checkout@v4
  with:
    token: ${{ secrets.DOC_FIXING_AGENT_GITHUB_TOKEN }}
    fetch-depth: 0  # Full history for better context
```

**Step 2: Java Installation**
```yaml
- name: Set up Java 11
  uses: actions/setup-java@v4
  with:
    distribution: 'temurin'
    java-version: '11'
```

**Step 3: Maven Installation**
```yaml
- name: Set up Maven 3.6.3
  run: |
    sudo apt-get update
    sudo apt-get install -y maven
```

**Step 4: Node.js Installation**
```yaml
- name: Set up Node.js (latest)
  uses: actions/setup-node@v4
  with:
    node-version: 'lts/*'
```

**Step 5: Download WSO2AM Pack**
```yaml
- name: Get Latest WSO2AM Release and Download Pack
  run: |
    # Fetch latest release from GitHub API
    LATEST_RELEASE=$(curl -s "https://api.github.com/repos/wso2/product-apim/releases?per_page=10" | \
      jq -r '.[0].tag_name' | sed -E 's/^v//')

    # Download and extract
    DOWNLOAD_URL="https://github.com/wso2/product-apim/releases/download/v${LATEST_RELEASE}/wso2am-${LATEST_RELEASE}.zip"
    wget -q "$DOWNLOAD_URL" -O "wso2am-${LATEST_RELEASE}.zip"
    unzip -q "wso2am-${LATEST_RELEASE}.zip"

    # Set environment variables
    echo "WSO2AM_VERSION=${LATEST_RELEASE}" >> $GITHUB_ENV
```

**Step 6: Prepare System Prompt**
```yaml
- name: Prepare system prompt with environment variables
  run: |
    export ISSUE_NUMBER="${{ github.event.issue.number }}"
    export GITHUB_TOKEN="${{ secrets.DOC_FIXING_AGENT_GITHUB_TOKEN }}"
    export WSO2AM_VERSION="${{ env.WSO2AM_VERSION }}"

    # Substitute variables in system prompt
    SYSTEM_PROMPT=$(envsubst < .github/claude/system_prompt_update_v2.txt)

    # Store in environment
    echo "SYSTEM_PROMPT<<EOF" >> $GITHUB_ENV
    echo "$SYSTEM_PROMPT" >> $GITHUB_ENV
    echo "EOF" >> $GITHUB_ENV
```

**Step 7: Run Claude AI**
```yaml
- name: Run Claude (with environment persistence)
  uses: anthropics/claude-code-action@v1
  with:
    anthropic_api_key: ${{ secrets.DOC_FIXING_AGENT_ANTHROPIC_API_KEY }}
    github_token: ${{ secrets.DOC_FIXING_AGENT_GITHUB_TOKEN }}
    show_full_output: true
    prompt: ${{ env.SYSTEM_PROMPT }}
    trigger_phrase: "@wso2-engineering-bot"
    claude_args: |
      --allowedTools "Bash(*),Edit,Read,Write,WebFetch,WebSearch,mcp__github__*"
      --model claude-sonnet-4-5-20250929
```

**Step 8: Upload Artifact**
```yaml
- name: Upload artifact pack
  uses: actions/upload-artifact@v4
  with:
    name: wso2am-${{ env.WSO2AM_VERSION }}-issue-${{ github.event.issue.number }}
    path: ${{ github.workspace }}/wso2am-${{ env.WSO2AM_VERSION }}-issue-${{ github.event.issue.number }}.zip
```

---

## System Prompt Breakdown

The `system_prompt_update_v2.txt` file contains detailed instructions for Claude AI. Here's a breakdown of key sections:

### Repository Configuration

```
Repository: ${REPOSITORY}
Issue Number: ${ISSUE_NUMBER}
GitHub Token: ${GITHUB_TOKEN}
Working Branch: fix_issue_${ISSUE_NUMBER}_$(date +%s)
```

**Purpose**: Dynamically configures the agent for each issue using environment variables.

### Project Context

Defines the WSO2 API Manager ecosystem:
- **apim-apps**: Frontend applications → generates .war files
- **carbon-apimgt**: Core backend services → generates .jar files
- **product-apim**: Main distribution → generates .jar files
- **api-developer-portal**: Standalone portal → generates .war files

### Phase-by-Phase Instructions

#### PHASE 1: Understand the Issue

**Key Requirements:**
- Read complete issue description
- Read ALL comments (often contain critical information)
- Analyze screenshots to identify affected portal
- Follow any links for additional context
- Determine issue type (frontend vs backend)

**Example Screenshot Analysis:**
- Identify portal from URL paths (/publisher, /devportal)
- Extract visible error messages
- Note expected vs actual behavior

#### PHASE 2: Find the Solution

**Step 1: Check for Explicit Fix**

The prompt handles TWO formats:

**Format 1: Plain Text Instructions**
```
"Change the validation logic in UserService to check for null values"
```

**Format 2: Actual Code**
```java
if (user != null && user.getName() != null) {
    return user.getName();
}
```

**Step 2: Search Similar Closed Issues**

If no explicit fix provided:
```bash
# Search pattern
repo:wso2/[repository-name] is:issue is:closed [error message]
```

**Step 3: Review Solution from Closed Issues**
- Analyze merged PRs
- Identify changed files
- Understand fix methodology
- Adapt solution pattern

#### PHASE 3: Apply the Fix

**Repository Cloning:**
```bash
cd ${GITHUB_WORKSPACE}
git clone https://github.com/ranuka-laksika/${AFFECTED_REPOSITORY}.git
cd ${AFFECTED_REPOSITORY}
```

**Branch Creation:**
```bash
git config --global user.name "ranuka-laksika"
git config --global user.email "ranukalaksika@gmail.com"
git remote set-url origin https://${GITHUB_TOKEN}@github.com/ranuka-laksika/${AFFECTED_REPOSITORY}.git
git checkout -b fix_issue_${ISSUE_NUMBER}_$(date +%s)
```

**Code Changes:**
- Only modify bug-related files
- No temporary or test files
- Minimal, targeted changes

#### PHASE 4: Build and Deploy

**CRITICAL RULE**: Build ONLY the modified component, NOT the entire repository.

**For Frontend Components (apim-apps):**

1. **Navigate to Component:**
   ```bash
   cd portals/publisher  # or devportal, admin
   ```

2. **Build:**
   ```bash
   mvn clean install
   # Generates: target/publisher.war
   ```

3. **Replace in WSO2AM Pack:**
   ```bash
   cd wso2am-${WSO2AM_VERSION}/repository/deployment/server/webapps/
   rm -rf publisher           # Remove old folder
   cp [source]/publisher.war . # Copy new .war
   unzip publisher.war -d publisher  # Extract
   rm publisher.war            # Cleanup
   ```

**For Backend Components (carbon-apimgt, product-apim):**

1. **Identify Component:**
   ```
   Example: org.wso2.carbon.apimgt.impl
   ```

2. **Extract Version from WSO2AM Pack:**
   ```bash
   cd wso2am-${WSO2AM_VERSION}/repository/components/plugins/
   ls -la | grep org.wso2.carbon.apimgt.impl
   # Output: org.wso2.carbon.apimgt.impl_9.32.147.jar
   # Version: 9.32.147
   ```

3. **Update pom.xml:**
   ```xml
   <parent>
      <groupId>org.wso2.carbon.apimgt</groupId>
      <artifactId>apimgt</artifactId>
      <version>9.32.148-SNAPSHOT</version>
      <relativePath>../pom.xml</relativePath>
   </parent>
   <version>9.32.147</version>  <!-- Add this line -->
   <modelVersion>4.0.0</modelVersion>
   <artifactId>org.wso2.carbon.apimgt.impl</artifactId>
   ```

4. **Build Component:**
   ```bash
   cd components/apimgt/org.wso2.carbon.apimgt.impl
   mvn clean install
   # WAIT for BUILD SUCCESS (3-5 minutes)
   # Generates: target/org.wso2.carbon.apimgt.impl-9.32.147.jar
   ```

5. **Revert pom.xml Changes:**
   ```bash
   # Remove the <version> tag you added
   ```

6. **Create Patch Folder:**
   ```bash
   cd wso2am-${WSO2AM_VERSION}/repository/components/patches/
   mkdir patch0001  # Use next available number
   cp [source]/org.wso2.carbon.apimgt.impl-*.jar patch0001/
   ```

**Build Wait Strategy:**
- Wait 3 minutes initially
- Check for "BUILD SUCCESS"
- If not complete, wait 2 more minutes
- Repeat until success or failure

#### PHASE 5: Test and Validate

**Frontend Issues:**
- No testing required → Proceed to Phase 6

**Backend Issues:**
1. Start WSO2AM pack with patch
2. Execute reproduction steps
3. Verify issue is resolved
4. If issue persists:
   - Stop pack
   - Revert changes
   - Apply revised fix
   - Rebuild and replace
   - Test again

#### PHASE 6: Create PR and Upload

**Zip the Updated Pack:**
```bash
cd ${GITHUB_WORKSPACE}
zip -r wso2am-${WSO2AM_VERSION}-issue-${ISSUE_NUMBER}.zip wso2am-${WSO2AM_VERSION}/
```

**Commit and Push:**
```bash
cd ${GITHUB_WORKSPACE}/${AFFECTED_REPOSITORY}
git add .
git commit -m "Fix: [brief description]"
git push origin fix_issue_${ISSUE_NUMBER}_$(date +%s)
```

**Create Pull Request:**

The prompt provides a detailed PR template:

```markdown
Fixes #${ISSUE_NUMBER}

**Issue URL**: https://github.com/ranuka-laksika/api-manager/issues/${ISSUE_NUMBER}

## Problem
[Brief description of the issue]

## Solution
[Brief description of your fix and why it works]

## Changes Made
- Modified: [list files changed]
- [Description of specific changes]

## Build Information
- Java 11 (Temurin-Hotspot)
- Maven 3.6.3
- Built component: [component name]
- Generated artifact: [artifact name and location]

## Artifacts Replaced
- **Frontend**: Replaced `[folder name]` in webapps/
- **OR Backend**: Replaced `[jar name]` in plugins/ via patch0001/

## Testing
[For backend: Describe testing performed and results]
[For frontend: "No testing required for frontend changes"]

## Modified wso2am Pack Download
🔗 **[Download from GitHub Actions](https://github.com/ranuka-laksika/api-manager/actions/runs/${GITHUB_RUN_ID})**

**Artifact Details:**
- **Name**: `wso2am-${WSO2AM_VERSION}-issue-${ISSUE_NUMBER}.zip`
- **Contents**: Complete wso2am pack with all updated artifacts ready to use.
```

---

## Usage Guide

### For Users

**Step 1: Report a Bug**
Create a GitHub issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if UI-related)
- Error logs (if backend-related)

**Step 2: Trigger the Agent**
Comment on the issue:
```
@wso2-engineering-bot
```

**Step 3: Monitor Progress**
- Go to Actions tab
- Find the running workflow
- View real-time logs

**Step 4: Review the Pull Request**
- Agent creates a PR automatically
- Review code changes
- Check PR description
- Test the fix if needed

**Step 5: Download the Fixed Pack**
- Click the Actions run link in PR description
- Scroll to "Artifacts" section
- Download the zip file
- Extract and use

### For Maintainers

**Approving Pull Requests:**
1. Review code quality and changes
2. Verify the fix addresses the issue
3. Check for security implications
4. Test the artifact if necessary
5. Merge if satisfactory

**Handling Failures:**
1. Check workflow logs in Actions tab
2. Identify failure point
3. Review error messages
4. Re-trigger if transient issue
5. Adjust system prompt if needed

---

## Troubleshooting

### Common Issues

#### Issue 1: "could not read Username" Git Error

**Symptoms:**
```
fatal: could not read Username for 'https://github.com': terminal prompts disabled
```

**Causes:**
- Git remote URL doesn't include token
- Not in repository directory

**Solutions:**
```bash
# Verify current directory
pwd  # Should be in repository directory

# Check remote URL
git remote -v

# Reconfigure remote with token
git remote set-url origin https://${GITHUB_TOKEN}@github.com/ranuka-laksika/${AFFECTED_REPOSITORY}.git
```

#### Issue 2: Build Failures

**Symptoms:**
```
[ERROR] Failed to execute goal ...
BUILD FAILURE
```

**Common Causes:**
- Building from wrong directory
- Java version mismatch
- Missing dependencies

**Solutions:**
```bash
# Verify you're in component directory
pwd

# Check Java version
java -version  # Should be 11

# Verbose build for details
mvn clean install -X

# Verify pom.xml version matches pack version
```

#### Issue 3: Build Not Completing

**Symptoms:**
- No "BUILD SUCCESS" message
- Process seems stuck

**Solutions:**
1. WAIT - builds take 3-5 minutes
2. Follow Build Wait Strategy:
   - Wait 3 minutes initially
   - Check every 2 minutes
   - Don't proceed until SUCCESS

#### Issue 4: Artifact Not Found

**Symptoms:**
```
cp: cannot stat 'target/*.jar': No such file or directory
```

**Causes:**
- Build didn't complete successfully
- Building from wrong directory
- Artifact name mismatch

**Solutions:**
```bash
# Verify build succeeded
# Look for "BUILD SUCCESS" in logs

# Check target directory
ls -la target/

# Verify artifact name matches
ls target/*.jar
```

#### Issue 5: Push Failures

**Symptoms:**
```
error: src refspec ... does not match any
```

**Causes:**
- Not in repository directory
- Branch doesn't exist
- No commits made

**Solutions:**
```bash
# Verify directory
pwd

# Check branch
git branch -a

# Verify commits
git log --oneline -n 5

# Check remote
git remote -v
```

#### Issue 6: Workflow Not Triggering

**Symptoms:**
- Comment `@wso2-engineering-bot` but nothing happens

**Possible Causes:**
- Workflow file not in correct location
- Secrets not configured
- Workflow disabled

**Solutions:**
1. Check workflow file exists: `.github/workflows/claude_runner.yml`
2. Verify secrets are configured in repository settings
3. Check Actions tab for any errors
4. Ensure workflows are enabled in repository settings

#### Issue 7: Claude AI Timeout

**Symptoms:**
- Workflow runs for maximum time then stops
- No PR created

**Solutions:**
1. Check API quota (Anthropic account)
2. Simplify the issue (break into smaller issues)
3. Review system prompt for efficiency
4. Check for infinite loops in prompt logic

---

## Best Practices

### For Writing Bug Reports

**Do's:**
- Provide clear, detailed descriptions
- Include exact error messages
- Add screenshots for UI issues
- Specify reproduction steps
- Mention affected component/portal
- Reference similar issues if known

**Don'ts:**
- Vague descriptions like "it doesn't work"
- Missing reproduction steps
- No error logs for backend issues
- Combining multiple unrelated bugs

### For System Prompt Maintenance

**Version Control:**
- Keep system prompt in version control
- Document changes in commit messages
- Test changes with sample issues
- Maintain backward compatibility

**Optimization:**
- Keep instructions clear and concise
- Use concrete examples
- Avoid ambiguous language
- Test with various issue types

**Updates:**
- Review after each failure
- Incorporate learnings
- Update based on new repository structures
- Add troubleshooting for new error patterns

### For Workflow Configuration

**Resource Management:**
- Use concurrency controls to prevent simultaneous runs
- Set appropriate timeouts
- Clean up temporary files
- Optimize artifact sizes

**Security:**
- Never expose tokens in logs
- Use secrets for sensitive data
- Limit tool permissions
- Review PRs before merging

**Monitoring:**
- Regularly check workflow runs
- Monitor API usage
- Track success rates
- Analyze failure patterns

### For Repository Maintenance

**Branch Management:**
- Use timestamped branches for uniqueness
- Clean up merged branches regularly
- Protect main/master branches
- Enforce PR reviews

**Artifact Management:**
- Set artifact retention policies
- Clean up old artifacts
- Use descriptive names
- Include version numbers

---

## Advanced Configuration

### Custom Issue Types

To support additional issue types, modify the system prompt:

1. Add new issue type detection logic
2. Define specific handling for that type
3. Update affected repository mapping
4. Add build instructions if needed

### Multiple Trigger Phrases

To add alternative trigger phrases, modify workflow:

```yaml
if: |
  contains(github.event.comment.body, '@wso2-engineering-bot') ||
  contains(github.event.comment.body, '@fix-bot')
```

### Custom Build Configurations

For specific components requiring different build commands:

Update the system prompt's PHASE 4 section with component-specific instructions:

```markdown
For component X:
1. Navigate to: components/x
2. Build with: mvn clean install -Pspecial-profile
3. Artifact location: target/x-custom.jar
```

### Adding New Repositories

To support additional WSO2 repositories:

1. Add repository information to "Project Context" section
2. Define artifact types (.jar, .war, .zip)
3. Specify build instructions
4. Add deployment/replacement steps

### Scheduled Runs

The workflow includes an optional scheduled trigger:

```yaml
schedule:
  - cron: '0 * * * *'  # Runs hourly
```

**Use Cases:**
- Periodically check for unresolved issues
- Retry failed fixes
- Update stale branches

**To Enable:**
Uncomment the schedule section and adjust cron expression.

---

## Performance Metrics

### Expected Execution Times

| Phase | Duration | Notes |
|-------|----------|-------|
| Environment Setup | 2-4 minutes | Java, Maven, Node.js installation |
| WSO2AM Download | 1-2 minutes | Depends on network speed |
| Claude Analysis | 2-5 minutes | Issue complexity dependent |
| Repository Clone | 30 seconds | Repository size dependent |
| Component Build | 3-7 minutes | Component size dependent |
| Testing (Backend) | 5-10 minutes | Issue complexity dependent |
| PR Creation | 30 seconds | - |
| Artifact Upload | 1-3 minutes | Pack size ~500MB |
| **Total** | **15-35 minutes** | Average: 20-25 minutes |

### Cost Estimation

**GitHub Actions:**
- Free for public repositories
- 2000 minutes/month for private repos (free tier)

**Anthropic API:**
- Claude Sonnet 4.5: ~$3 per million input tokens
- Average bug fix: 50K-200K tokens
- Estimated cost per fix: $0.15 - $0.60

**Recommendations:**
- Monitor API usage monthly
- Set up usage alerts
- Optimize system prompt for token efficiency

---

## Security Considerations

### Token Security

**GitHub Token:**
- Use Personal Access Token (PAT) with minimal permissions
- Required scopes: `repo`, `workflow`
- Store in GitHub Secrets (never in code)
- Rotate regularly (every 90 days recommended)

**Anthropic API Key:**
- Store in GitHub Secrets
- Monitor usage for anomalies
- Set up budget alerts
- Use separate keys for dev/prod

### Code Review

**Before Merging AI PRs:**
- Review all code changes manually
- Check for security vulnerabilities
- Verify no sensitive data exposure
- Test in isolated environment first

**Common Vulnerabilities to Check:**
- SQL injection points
- XSS vulnerabilities
- Hardcoded credentials
- Insecure dependencies

### Access Control

**Repository Permissions:**
- Limit who can trigger the bot
- Restrict PR merge permissions
- Enable branch protection rules
- Require code review approvals

---

## Future Enhancements

### Potential Improvements

1. **Multi-Repository Fixes**
   - Handle bugs spanning multiple repositories
   - Coordinate changes across repos
   - Create linked PRs

2. **Automated Testing**
   - Run unit tests before PR creation
   - Integration tests for backend fixes
   - UI tests for frontend fixes

3. **Learning from Feedback**
   - Analyze merged vs rejected PRs
   - Improve fix selection logic
   - Build knowledge base of patterns

4. **Enhanced Reporting**
   - Detailed fix analysis reports
   - Performance metrics dashboard
   - Success rate tracking

5. **Interactive Mode**
   - Ask clarifying questions on ambiguous issues
   - Request additional information
   - Provide progress updates via comments

---

## Support and Contribution

### Getting Help

- **GitHub Issues**: Report problems or request features
- **Documentation**: Refer to this guide
- **Anthropic Docs**: Claude AI capabilities and limitations

### Contributing

To improve the bug fixing agent:

1. Fork the repository
2. Test changes with sample issues
3. Update documentation
4. Submit pull request with clear description

### Feedback

We welcome feedback on:
- Fix accuracy and quality
- Execution time and efficiency
- Documentation clarity
- Feature requests

---

## Appendix

### Environment Variables Reference

| Variable | Source | Purpose | Example |
|----------|--------|---------|---------|
| `ISSUE_NUMBER` | GitHub event | Current issue number | `123` |
| `REPOSITORY` | GitHub variable | Target repository name | `api-manager` |
| `GITHUB_TOKEN` | GitHub secret | Authentication token | `ghp_xxxx` |
| `GITHUB_RUN_ID` | GitHub context | Workflow run ID | `1234567890` |
| `WSO2AM_VERSION` | Workflow step | Downloaded pack version | `4.3.0` |
| `JAVA_HOME` | Setup action | Java installation path | `/opt/java/11` |
| `MAVEN_HOME` | Setup step | Maven installation path | `/usr/share/maven` |
| `GITHUB_WORKSPACE` | GitHub context | Workspace directory | `/home/runner/work/repo/repo` |

### Allowed Tools Reference

The agent has access to these tools:

**Bash Commands:**
- Git operations (`git *`)
- Maven builds (`mvn *`)
- File operations (`cp`, `mkdir`, `rm`, `ls`)
- Archive operations (`zip`, `unzip`)
- Package managers (`npm`, `apt`)
- System commands (`echo`, `export`, `env`)

**File Operations:**
- `Read`: Read file contents
- `Write`: Create new files
- `Edit`: Modify existing files

**Web Access:**
- `WebFetch`: Fetch web content
- `WebSearch`: Search the web

**GitHub MCP Tools:**
- `mcp__github__create_pull_request`
- `mcp__github__get_issue`
- `mcp__github__search_issues`
- `mcp__github__add_issue_comment`
- `mcp__github__update_issue`
- And more...

### WSO2 API Manager Component Reference

| Component | Type | Artifact | Location |
|-----------|------|----------|----------|
| Publisher Portal | Frontend | publisher.war | webapps/ |
| Developer Portal | Frontend | devportal.war | webapps/ |
| Admin Portal | Frontend | admin.war | webapps/ |
| API Manager Impl | Backend | org.wso2.carbon.apimgt.impl_X.X.X.jar | plugins/ |
| API Manager Core | Backend | org.wso2.carbon.apimgt.core_X.X.X.jar | plugins/ |
| API Manager REST API | Backend | org.wso2.carbon.apimgt.rest.api_X.X.X.jar | plugins/ |

### Glossary

- **WSO2 API Manager**: Open-source API management platform
- **apim-apps**: Repository containing frontend applications
- **carbon-apimgt**: Repository containing backend API management services
- **product-apim**: Main distribution repository
- **Claude AI**: Anthropic's large language model
- **GitHub Actions**: CI/CD platform by GitHub
- **MCP**: Model Context Protocol for tool integration
- **PR**: Pull Request
- **Artifact**: Compiled output file (.jar, .war, .zip)
- **Patch**: Directory containing updated backend .jar files

---

## Changelog

### Version 2.0 (Current)
- Updated system prompt structure
- Enhanced fix discovery logic
- Improved build process documentation
- Added explicit vs implicit fix detection
- Better error handling instructions

### Version 1.0 (Initial)
- Basic bug fixing workflow
- Single repository support
- Manual PR creation

---

## License

This documentation is provided as-is for the WSO2 API Manager Bug Fixing AI Agent project.

---

**Last Updated**: 2025-01-17
**Maintained By**: Ranuka Laksika
**Contact**: ranukalaksika@gmail.com
