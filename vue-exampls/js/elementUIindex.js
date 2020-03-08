new Vue({
  el: "#app",
  data: function() {
    return {
      userInfo: {
        //用户信息
        name: "",
        gender: "",
        phoneNum: "",
        birthday: ""
      },
      tableData: [
        {
          name: "王小虎",
          gender: "女",
          phoneNum: "18543542569",
          birthday: "2015-11-06"
        }
      ],
      dialogVisible: false, //弹窗显示
      editObj: {
        name: "",
        gender: "",
        phoneNum: "",
        birthday: ""
      },
      userIndex: 0
    };
  },
  methods: {
    //添加用户信息
    addUser() {
      if (!this.userInfo.name) {
        this.$message({
          message: "请输入姓名！",
          type: "warning"
        });
        return;
      }
      if (!this.userInfo.gender) {
        this.$message({
          message: "请输入性别！",
          type: "warning"
        });
        return;
      }
      if (!this.userInfo.phoneNum) {
        this.$message({
          message: "请输入电话号码！",
          type: "warning"
        });
        return;
      }
      if (!/^1[3456789]\d{9}/.test(this.userInfo.phoneNum)) {
        this.$message({
          message: "请输入正确的电话号码！",
          type: "warning"
        });
        return;
      }
      if (!this.userInfo.birthday) {
        this.$message({
          message: "请输入生日！",
          type: "warning"
        });
        return;
      }
      this.tableData.push(this.userInfo);
      this.userInfo = {
        name: "",
        gender: "",
        phoneNum: "",
        birthday: ""
      }; //添加完后清空文本框里的内容
    },
    //删除一组数据
    delUser(index) {
      //console.log(index)
      //提示是否确认删除
      this.$confirm("确认删除？")
        .then(_ => {
          this.tableData.splice(index, 1);
        })
        .catch(_ => {});
    },
    //弹窗的右上角的叉关闭处理
    handleClose() {
      this.dialogVisible = false;
    },
    //编辑数据
    editUser(item, idx) {
      this.userIndex = idx;
      this.editObj = {
        name: item.name,
        gender: item.gender,
        phoneNum: item.phoneNum,
        birthday: item.birthday
      };
      this.dialogVisible = true;
    },
    confirm() {
      this.dialogVisible = false;
      //       //由于 JavaScript 的限制，Vue 不能检测以下数组的变动：

      // 当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue
      // 当你修改数组的长度时，例如：vm.items.length = newLength
      //       this.tableData[this.userIndex] = this.editObj;
      Vue.set(this.tableData, this.userIndex, this.editObj);
    }
  }
});
