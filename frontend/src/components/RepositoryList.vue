<template>
  <div>
    <div v-if="loading">Loading repositories...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <ul v-if="repos.length">
      <li v-for="repo in repos" :key="repo.id" class="repo">
        <h3 @click="selectRepo(repo)" class="repo-title">
          {{ repo.name }}
          <span>{{ selectedRepo?.id === repo.id ? '▲' : '▼' }}</span>
        </h3>
        <p v-if="repo.branch">Branch : {{ repo.branch }}</p>

        <div v-if="selectedRepo?.id === repo.id" class="issues">
          <h4>Issues :</h4>
          <div v-if="issuesLoading">Loading issues...</div>
          <div v-if="issuesError" class="error">{{ issuesError }}</div>

          <div v-if="Object.values(issues).flat().length > 0">
            <div v-for="severity in ['critical', 'high', 'medium', 'low']" :key="severity">
              <div v-if="issues[severity]?.length">
                <h5 :class="['severity-title', severity]" @click="toggleSeverity(severity)">
                  {{ severity.toUpperCase() }} ({{ issues[severity].length }})
                  <span class="collapse-icon">{{ expandedSeverities[severity] ? '▲' : '▼' }}</span>
                </h5>
                <div v-if="expandedSeverities[severity]">
                  <IssueCard
                    v-for="issue in issues[severity]"
                    :key="issue.id"
                    :issue="issue"
                  />
                </div>
              </div>
            </div>
          </div>

          <div v-if="!Object.values(issues).flat().length && !issuesLoading && !issuesError">
            No issues detected
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import IssueCard from './IssueCard.vue'
import config from '../config/api.config.js'

export default {
  components: { IssueCard },
  data() {
    return {
      repos: [],
      loading: true,
      error: null,
      selectedRepo: null,
      issues: [],
      issuesLoading: false,
      issuesError: null,
      expandedSeverities: {
        critical: true,
        high: false,
        medium: false,
        low: false
      }
    }
  },
  async created() {
    try {
      const res = await fetch(`${config.api.baseUrl}${config.api.endpoints.repos}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to retrieve repositories')
      this.repos = data
    } catch (err) {
      this.error = err.message
    } finally {
      this.loading = false
    }
  },
  methods: {
    async selectRepo(repo) {
      if (this.selectedRepo?.id === repo.id) {
        this.selectedRepo = null
        this.issues = []
        this.issuesError = null
        return
      }

      this.selectedRepo = repo
      this.issues = { critical: [], high: [], medium: [], low: [] }
      this.issuesLoading = true
      this.issuesError = null

      try {
        const res = await fetch(
          `${config.api.baseUrl}${config.api.endpoints.issues(repo.id)}`
        )
        const data = await res.json()

        if (!res.ok) {
          this.issuesError = data.error || 'Failed to retrieve repository issues'
          return
        }

        const filteredIssues = data.filter(issue => issue.code_repo_id === repo.id)

        filteredIssues.forEach(issue => {
          const severity = (issue.severity || 'low').toLowerCase()
          if (this.issues[severity]) {
            this.issues[severity].push(issue)
          } else {
            this.issues.low.push(issue)
          }
        })
      } catch (err) {
        this.issuesError = err.message
      } finally {
        this.issuesLoading = false
      }
    },
    toggleSeverity(severity) {
      this.expandedSeverities[severity] = !this.expandedSeverities[severity]
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

.repo {
  margin-bottom: 1em;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.repo-title {
  cursor: pointer;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.repo-title span {
  font-size: 0.8em;
  color: gray;
}

.issues {
  margin-top: 1em;
  padding-left: 1em;
}

.error {
  color: red;
}

.severity-title {
  margin: 0.5em 0;
  font-size: 0.95em;
  font-weight: bold;
  padding: 0.5em 0.8em;
  border-radius: 4px;
  display: inline-block;
  cursor: pointer;
  user-select: none;
  color: white;
}

.severity-title.critical {
  background-color: #e74c3c;
}

.severity-title.high {
  background-color: #e67e22;
}

.severity-title.medium {
  background-color: #f39c12;
}

.severity-title.low {
  background-color: #f1c40f;
  color: #000;
}

.collapse-icon {
  font-size: 0.8em;
  margin-left: 0.3em;
}

h4 {
  margin-top: 0;
}

p {
  margin: 0.5em 0;
  font-size: 0.95em;
}
</style>
