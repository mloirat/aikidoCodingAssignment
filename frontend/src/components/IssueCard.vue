<template>
  <div class="security-issue-card">
    <div class="badge-container">
      <span class="badge">{{ issue.type }}</span>
    </div>

    <p>Id : {{ issue.id }}</p>
    <p v-if="issue.affected_file">Affected file : {{ issue.affected_file }}</p>
    <p v-if="issue.rule">Rule : {{ issue.rule }}</p>

    <button
      v-if="issue.rule === 'Using backticks in PHP can lead to remote code execution'"
      @click="suggestFix"
      :disabled="loading"
      class="fix-btn"
    >
      {{ loading ? 'Generating Fix...' : 'Suggest Fix' }}
    </button>

    <div v-if="fixedCode" class="diff-container">
      <h4>Suggested Fix (Diff):</h4>
      <div class="diff-grid">
        <div class="diff-old">
          <h5>Original</h5>
          <pre>{{ hardcodedCode }}</pre>
        </div>
        <div class="diff-new">
          <h5>Fixed</h5>
          <pre>{{ fixedCode }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../config/api.config.js'

export default {
  props: {
    issue: { type: Object, required: true }
  },
  data() {
    return {
      fixedCode: null,
      loading: false,
      hardcodedCode: "<?php echo `ls -la ` . $_GET['dir']; ?>"
    }
  },
  methods: {
    async suggestFix() {
      this.loading = true
      try {
        const response = await fetch(
          `${config.api.baseUrl}${config.api.endpoints.fixBackticks}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: this.hardcodedCode })
          }
        )
        this.fixedCode = (await response.json()).fixedCode
      } catch (error) {
        console.error('Error generating fix:', error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.security-issue-card {
  border: 1px solid rgba(111, 28, 129, 0.61);
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 8px;
}

.badge-container {
  margin-bottom: 16px;
}

.badge {
  display: inline-block;
  padding: 0.4em 0.8em;
  border-radius: 4px;
  color: white;
  background-color: rgba(111, 28, 129, 0.61);
  font-weight: bold;
  font-size: 0.9em;
}

.fix-btn {
  background: #0b4db1;
  color: white;
  padding: 4px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.fix-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.diff-container {
  margin-top: 16px;
}

.diff-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 10px;
}

.diff-old,
.diff-new {
  padding: 8px;
  border: 1px solid;
}

.diff-old {
  background: #ffeef0;
  border-color: #fdb8c0;
}

.diff-new {
  background: #e6ffed;
  border-color: #acf2bd;
}

pre {
  white-space: pre-wrap;
  font-family: monospace;
  margin: 0;
}

h4 {
  margin-top: 0;
}

h5 {
  margin: 0 0 8px 0;
}

p {
  margin: 4px 0;
  font-size: 0.95em;
}
</style>