<template>
  <page>
    <header>
      <h1>{{ resume.name }} {{ resume.surnames }}</h1>
      <h2>{{ resume.position }}</h2>
    </header>
    <div class="container">
      <aside class="col sidebar">
        <div
          class="info"
          v-if="
            resume.location ||
            resume.phone ||
            resume.email ||
            (resume.links && resume.links.length)
          "
        >
          <h3>{{ $t('info') }}</h3>
          <div class="info-item" v-if="resume.location">
            <p class="info-title">{{ $t('location') }}</p>
            <p>{{ resume.location }}</p>
          </div>
          <div class="info-item" v-if="resume.phone">
            <p class="info-title">{{ $t('phone') }}</p>
            <p>
              <a :href="`tel:${resume.phone}`">{{ resume.phone }}</a>
            </p>
          </div>
          <div class="info-item" v-if="resume.email">
            <p class="info-title">{{ $t('email') }}</p>
            <p>
              <a :href="`mailto:${resume.email}`">{{ resume.email }}</a>
            </p>
          </div>
          <div class="info-item" v-if="resume.links && resume.links.length">
            <p class="info-title">{{ $t('websites') }}</p>
            <p
              class="link-item"
              v-for="(link, index) in resume.links"
              :key="index"
            >
              <a :href="link.url" target="_blank">
                <span v-html="link.icon" class="link-icon"></span>
                {{ link.url }}
              </a>
            </p>
          </div>
        </div>
        <div
          class="education"
          v-if="resume.education && resume.education.length"
        >
          <h3>{{ $t('education') }}</h3>
          <div
            class="education-item"
            v-for="(education, index) in resume.education"
            :key="index"
          >
            <p class="education-title">
              {{ education.title }}
            </p>
            <p class="education-school">
              {{ education.school }}
            </p>
            <p class="education-timeperiod">{{ education.timeperiod }}</p>
          </div>
        </div>
        <div
          class="languages"
          v-if="resume.languages && resume.languages.length"
        >
          <h3>{{ $t('languages') }}</h3>
          <div
            class="language-item"
            v-for="(language, index) in resume.languages"
            :key="index"
          >
            <p class="language-title">
              {{ language.title }}
              <span class="language-level">
                {{ levelToString(language.level) }}
              </span>
            </p>
          </div>
        </div>
      </aside>

      <section class="col main">
        <div class="introduction" v-if="resume.introduction">
          <h3>{{ $t('about_me') }}</h3>
          <div class="introduction-content" v-html="resume.introduction"></div>
        </div>
        <div class="skills" v-if="resume.skills && resume.skills.length">
          <h3>{{ $t('skills') }}</h3>
          <div v-if="resume.skills && resume.skills.length">
            <span
              class="skill-item"
              v-for="(skill, index) in resume.skills"
              :key="index"
            >
              {{ skill.title }}
            </span>
          </div>
        </div>
        <div
          class="experience"
          v-if="resume.experience && resume.experience.length"
        >
          <h3>{{ $t('experience') }}</h3>
          <div
            class="experience-item"
            v-for="(experience, index) in resume.experience"
            :key="index"
          >
            <p class="experience-title">
              {{ experience.position }},
              <component
                :is="experience.url ? 'a' : 'span'"
                :href="experience.url || ''"
                target="_blank"
                >{{ experience.company }}
              </component>
            </p>
            <div class="experience-timeperiod">
              <p
                v-for="(timeperiod, index) in experience.timeperiod"
                :key="index"
              >
                {{ timeperiod }}
              </p>
            </div>
            <div
              class="experience-description"
              v-html="experience.description"
            ></div>
            <div class="experience-tags">
              <span v-for="(tag, index) in experience.tags" :key="index">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
        <div class="projects" v-if="resume.projects && resume.projects.length">
          <h3>{{ $t('projects') }}</h3>
          <div
            class="projects-item"
            v-for="(project, index) in resume.projects"
            :key="index"
          >
            <p class="projects-title">
              {{ project.name }}
              <a v-if="project.url" :href="project.url" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  focusable="false"
                  width="1em"
                  height="1em"
                  style="
                    -ms-transform: rotate(360deg);
                    -webkit-transform: rotate(360deg);
                    transform: rotate(360deg);
                  "
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M6 8h5v2H6v8h8v-5h2v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2zm10.614-2H12V4h8v8h-2V7.442l-5.336 5.336l-1.414-1.414L16.614 6z"
                    fill="#626262"
                    fill-rule="evenodd"
                  />
                </svg>
              </a>
            </p>
            <div
              class="projects-description"
              v-html="project.description"
            ></div>
            <div class="projects-tags">
              <span v-for="(tag, index) in project.tags" :key="index">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </page>
</template>

<script>
// Theme based in this one: https://s3.resume.io/cdn-cgi/image/width=852,format=auto/uploads/local_template_image/image/503/cbd4ebb3adcd-0.jpg
export default {
  props: ['resume'],
  methods: {
    levelToString: function (value) {
      if (value == 10) {
        return this.$t('native')
      } else if (value >= 8 && value <= 9) {
        return this.$t('high')
      } else if (value >= 6 && value <= 7) {
        return `${this.$t('medium')}-${this.$t('high')}`
      } else if (value == 5) {
        return this.$t('medium')
      } else if (value >= 3 && value <= 4) {
        return `${this.$t('low')}-${this.$t('medium')}`
      } else if (value <= 2) {
        return this.$t('low')
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
header {
  text-align: center;
  margin: 0 150px;
  padding: 40px 0;
}
h1 {
  font-weight: bold;
  text-transform: uppercase;
  font-size: 30px;
}
h2 {
  text-transform: uppercase;
  font-size: 20px;
}

h3 {
  text-transform: uppercase;
  border-bottom: 2px solid #424242;
  font-weight: bold;
  letter-spacing: 3px;
  margin-bottom: 15px;
}

p {
  font-size: 12px;
}

a {
  color: #424242;
  &:active {
    color: #424242;
  }
}

.container {
  display: flex;
  margin: auto -5px 10px;

  >>> ul {
    list-style: circle;
  }

  >>> ol,
  >>> ul {
    margin-left: 15px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
}

.col {
  padding: 10px 30px;
}

.sidebar {
  flex: 1;
  margin-left: 20px;
}

.main {
  flex: 3;
  margin-right: 20px;
}

.introduction {
  margin-bottom: 20px;
  .introduction-content {
    margin: 5px 0;
    font-size: 12px;
  }
}

.info {
  margin-bottom: 20px;
  .info-item {
    margin: 15px 0;
    .link-item {
      a {
        display: flex;
        margin-bottom: 5px;
        word-wrap: break-word;
        .link-icon {
          display: flex;
          align-self: center;
          margin-right: 3px;
        }
      }
    }
  }

  .info-title {
    font-weight: bold;
    text-transform: uppercase;
  }
}

.skills {
  margin-bottom: 20px;
  .skill-item {
    display: inline-block;
    border: 1px solid #4a4a4a;
    padding: 2px 5px;
    margin-right: 5px;
    margin-bottom: 5px;
    font-size: 15px;
  }
}

.experience {
  margin-bottom: 20px;
  .experience-item {
    margin-bottom: 15px;
    .experience-title {
      font-weight: bold;
      font-size: 15px;
    }
    .experience-description {
      font-size: 12px;
      margin-top: 5px;
    }
    .experience-tags {
      margin-top: 8px;
      span {
        display: inline-block;
        border: 1px solid #4a4a4a;
        padding: 2px 5px;
        margin-right: 5px;
        font-size: 11px;
        margin-bottom: 5px;
      }
    }
  }
}

.projects {
  margin-bottom: 20px;
  .projects-item {
    margin-bottom: 15px;
    .projects-title {
      display: flex;
      font-weight: bold;
      font-size: 15px;
      a {
        display: flex;
        margin-left: 3px;
        svg {
          display: flex;
          align-self: center;
        }
      }
    }
    .projects-description {
      font-size: 12px;
      margin-top: 5px;
    }
    .projects-tags {
      margin-top: 8px;
      span {
        display: inline-block;
        border: 1px solid #4a4a4a;
        padding: 2px 5px;
        margin-right: 5px;
        font-size: 11px;
        margin-bottom: 5px;
      }
    }
  }
}

.languages {
  margin-bottom: 20px;
  .language-item {
    margin: 10px 0;
    .language-level {
      float: right;
      font-style: italic;
    }
  }
}

.education {
  margin-bottom: 20px;
  .education-item {
    margin-bottom: 10px;
    .education-title {
      font-weight: bold;
    }
    .education-timeperiod {
      font-style: italic;
    }
  }
}
</style>
