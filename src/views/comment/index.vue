<template>
  <div class="app-container">
    <template>
      <div class="ul_css" style="overflow: auto">

        <ul
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled"
        >
          <li v-for="(item,index) in commentList" :key="index">
            <div>
              <span class="li_css" v-html="item.comment_content"></span>
              <br>
              <br>
              <div class="reply_css" v-for="(reply,index) in item.replies" :key="index">
                <span v-if="reply.user_name === '作者回复'" v-html="reply.content">

                </span>
              </div>

              <br>
              <br>

              <hr>
              <br>

            </div>
          </li>
        </ul>
      </div>
      <p v-if="loading" class="p_css">加载中...</p>
      <div>
        <span v-if="disabled" class="p_css">没有更多了</span>
        <span class="btn_css">
          <el-button @click="getArticle" type="success" style="margin-left: 16px;">
           文章选择
          </el-button>
          <el-button v-bind:disabled="loading" @click="load(null)" type="success" style="margin-left: 16px;">
           下页评论
          </el-button>
        </span>
      </div>
    </template>
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false"
    >
      <div class="div_css">
        <div v-for="(item, index) in articleList" :key="index">
          <a class="a_css" v-html="item.article_title" @click="load(item.id)"> </a>
        </div>
      </div>
    </el-drawer>


  </div>
</template>

<script>

import { getCommentApi, getArticleApi } from '@/api/comment/comment'
import { isEmpty } from '@/utils/validate.js'

export default {
  data() {
    return {
      drawer: false,
      disabled: false,
      count: 0,
      params: {
        aid: '70848',
        prev: '0'
      },
      articleParam: {
        cid: '139'
      },
      lastComment: {},
      commentList: [],
      newCommentList: [],
      page: {
        count: null,
        more: true
      },
      commentDTO: {
        code: 0,
        data: {
          list: this.commentList,
          page: this.page
        },
        error: [],
        extra: []
      },
      loading: false,
      oldLength: 0,
      articleList: []
    }
  },
  created() {
    // this.getComment()
  },
  methods: {
    getArticle() {
      this.drawer = true
      if (this.articleList.length !== 0) {
        return
      }
      getArticleApi(this.articleParam).then(response => {
          this.articleList = response.list
        }
      )
    },
    getComment() {
      getCommentApi(this.params).then(response => {
        this.loading = true
        if (response.data.page.more !== true) {
          this.disabled = true
        }
        this.commentDTO = response

        this.newCommentList = response.data.list
        let length = this.newCommentList.length
        this.lastComment = this.newCommentList[length - 1]

        // 过滤非作者回复评论
        let temp = []
        this.newCommentList.forEach(o => {
          let replies = o.replies
          if (replies !== undefined && replies !== null && Object.keys(replies).length !== 0) {
            replies.forEach(reply => {
              if (reply.user_name === '作者回复') {
                temp.push(o)
              }
            })
          }
        })
        if (temp.length === 0) {
          return
        }
        this.commentList = this.commentList.concat(temp)
        this.commentList = [...new Set(this.commentList)];
        console.log(this.commentList)
        if (this.oldLength === this.commentList.length) {
          this.loading = true
        } else {
          this.loading = false
        }

      })
    },
    load(id) {
      if (!isEmpty(id)) {
        this.params.aid = id
        this.params.prev = 0
        this.commentList = []
        this.newCommentList = []
        this.commentDTO = {}
        this.lastComment = {}
        this.oldLength = 0
        console.log('id is not null')
      }
      // this.params.cid = null
      console.log('id is null')
      this.params.prev = this.lastComment.score
      this.getComment()
    }
  }
}
</script>

<style scoped>

.a_css {
  color: cadetblue;
  line-height: 10px;
}

a:hover {
  color: #ff4f46;
}

.div_css {
  margin: 8%;
  margin-bottom: 21%;
}

.btn_css {
  float: left;
  margin-top: 2%;
  margin-left: 2%;
}

.p_css {
  text-align: center;
  color: #ff4f46;
}

.ul_css {
  width: auto;
  margin-right: 2%;
  height: 750px;
}

.li_css {
}

.reply_css {
  color: #ff4f46;
}
</style>

