<template>
  <div class="department-form">
    <div class="title">{{ title }}</div>
    <div class="content">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="100px"
        class="demo-form"
        size="medium"
      >
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="所属上级" prop="org">
          <el-cascader
            v-model="form.org"
            :options="options"
            :props="defaultProps"
            clearable
          ></el-cascader>
        </el-form-item>

        <el-form-item label="部门描述" prop="desc">
          <el-input type="textarea" :rows="3" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">{{ confirmText }}</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      defaultProps: {
        label: 'name',
        value: 'id',
        checkStrictly: true
      },
      rules: {
        name: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
        org: [{ required: true, message: '请填写描述', trigger: 'change' }]
      }
    }
  },
  computed: {
    title () {
      return this.mode === 'add' ? '添加部门' : '修改部门'
    },
    confirmText () {
      return this.mode === 'add' ? '添加' : '保存'
    }
  },
  props: {
    form: {
      type: Object,
      default: () => {}
    },
    mode: {
      type: String,
      default: () => 'add'
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    save () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('save')
        }
      })
    }
  }
}
</script>
<style lang="scss">
.department-form {
  .title {
    font-weight: 500;
    font-size: 14px;
    color: #2d303b;
    line-height: 20px;
    margin-bottom: 10px;
  }
  .content {
    .el-form-item {
      margin-bottom: 10px;
    }
    .el-form-item:nth-child(3) {
      margin-bottom: 24px;
    }
    .el-form-item__label {
      float: none;
    }
    .el-form-item__content {
      margin-left: 0 !important;
    }
    .el-input,
    .el-textarea {
      width: 328px;
    }
  }
}
</style>
