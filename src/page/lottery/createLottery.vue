<template>
  <div class="page lottery-page">
    <div class="location">
      <div class="h-wrap">
        <a href="">区块链大乐透</a>
        <span>></span>
        <a href="">大乐透详情</a>
        <span>></span>
        <span class="blue-color">发起大乐透</span>
      </div>
    </div>
    <div class="create-lottery">
      <div class="h-wrap">
        <!--  活动币种  -->
        <div class="title">发起大乐透</div>
        <div class="field">
          <h4>活动币种</h4>
          <div class="input-wrap">
            <span>最低投注金额 = </span>
            <input type="text" class="input diff" placeholder="">
            <span>RPO</span>
          </div>
        </div>
        <!--  分红池分红奖励比例  -->
        <div class="field">
          <h4>分红池分红奖励比例</h4>
          <p>根据投注金额按设定的百分比给用户每次发放分红奖励</p>
          <div class="input-wrap">
            <span>每次发放分红金额 = 单笔投注金额 * </span>
            <input type="text" class="input" placeholder="">
            <span>%</span>
          </div>
          <div class="input-wrap">
            <span>发放分红时间间隔 = </span>
            <input type="text" class="input" placeholder="">
            <span>小时/次</span>
          </div>
        </div>
        <!--  奖金池比例  -->
        <div class="field">
          <h4>奖金池比例</h4>
          <p>从最后的排位开始倒序发放奖励，根据单笔投注的订单发放奖励，直到奖金池金额发放完为止</p>
          <div class="input-wrap">
            <span>奖金池奖励金额 = 单笔投注金额 * </span>
            <input type="text" class="input" placeholder="">
            <span>%</span>
          </div>
        </div>
        <!--  投注金额分配比例  -->
        <div class="field">
          <h4>投注金额分配比例</h4>
          <p>设置用户投注后金额分别进入分红池和奖金池的比例</p>
          <div class="input-wrap">
            <span>进入分红池金额 = 单笔投注金额 * </span>
            <input type="text" class="input" v-model="dividePoolRatio">
            <span>%</span>
          </div>
          <div class="input-wrap">
            <span>进入奖金池金额 = 单笔投注金额 * </span>
            <input type="text" class="input" v-model="bonusPoolRatio">
            <span>%</span>
          </div>
        </div>
        <!--  发起人抽成金额设置  -->
        <div class="field">
          <h4>发起人抽成金额设置</h4>
          <p>设置用户获得100%收益后的额外收益部分抽取的提成金额</p>
          <div class="input-wrap">
            <span>发起人抽成金额 = 用户额外收益 * </span>
            <input type="text" class="input" placeholder="">
            <span>%</span>
          </div>
        </div>
        <!--  推荐奖励相关设置  -->
        <div class="field">
          <h4>推荐奖励相关设置</h4>
          <p>根据用户最后一笔投注金额，推荐用户新增投注金额后，向用户增加发放分红奖励，不满一次不发放奖励</p>
          <div class="input-wrap">
            <h4>请选择推荐关系进行奖励</h4>
            <div class="select-wrap">
              <el-select v-model="dividendRelationshipType">
                <el-option
                  v-for="item in dividendRelationshipTypeOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <!--  优惠券折扣设置  -->
        <div class="field">
          <h4>优惠券折扣设置</h4>
          <p>推荐用户使用优惠券支付可获得折扣优惠，同时加入该用户的树形结构</p>
          <div class="input-wrap">
            <span>使用优惠券支付金额 = 投注金额 * </span>
            <input type="text" class="input" placeholder="">
            <span>%</span>
          </div>
        </div>
        <!--  奖励次数设置  -->
        <div class="field">
          <div class="input-wrap">
            <span>奖励次数 = 小区新增业绩 / 最后单笔投注金额 * </span>
            <input type="text" class="input" placeholder="">
            <!-- <span>%</span> -->
          </div>
          <div class="input-wrap">
            <span>奖励间隔次数 = 每分红</span>
            <input type="text" class="input" placeholder="">
            <span>次后发放一次奖励</span>
          </div>
          <div class="input-wrap">
            <span>推荐奖励金额 = 最后一笔投注金额 * </span>
            <input type="text" class="input" placeholder="">
            <span>%</span>
          </div>
        </div>
        <button class="btn" :disabled="!allWrite">完成设置</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currency: '', // 投注币种
      lotteryOwnerFee: '', // 投注收益手续费百分比
      dividePoolRatio: '', // 进入分红池比例
      bonusPoolRatio: '', // 进入奖金池比例
      earningsRatio: '', // 投注每天收益比例
      earningsNum: '', // 投注分红收益最大次数
      bonusReturnRatio: '', // 结束时每笔投注奖励比例
      performanceDividendNum: '', // 业绩奖励用户第一笔投注分红次数
      endBonusPoolRemainingRatio: '', // 结束剩余奖金池比例
      betDiscountRatio: '', // 优惠码投注折扣比例
      dividendRelationshipType: 1, // 分红关系类型 1：雷达用户关系 2：优惠码
      dividendRelationshipTypeOption: [{ // 分红关系类型选项
        label: 'RADAR推荐关系',
        value: 1
      }, {
        label: '熟人关系',
        value: 2
      }]
    }
  },
  computed: {
    allWrite: () => {
      return this
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/mixin';
  .create-lottery{
    line-height: 1.2;
    .h-wrap{
      width: 1000px;
    }
    .title{
      font-size: 32px;
      padding: 60px 0 10px;
      color: @blue;
    }
    .notic{
      .title{
        text-align: center;
        padding-bottom: 40px;
      }
      .section{
        p{
          line-height: 2;
          padding: 10px 0;
        }
      }
      .money{
        font-size: 20px;
        padding-top: 40px;
        border-top: 1px solid #ccc;
      }
    }
    .field{
      padding: 48px 0;
      border-bottom: 1px solid #ccc;
      color: #999999;
      font-size: 18px;
      h4{
        color: #000000;
        padding-bottom: 20px;
      }
      p{
        font-size: 16px;
        padding-bottom: 40px;
      }
      .input{
        width: 120px;
        text-align: center;
        margin: 0 5px;
        &.diff{
          width: 200px;
        }
      }
      .input-wrap{
        & + .input-wrap{
          padding-top: 40px;
        }
      }
      .select-wrap{
        width: 800px;
      }
    }
    .btn{
      margin-top: 60px;
    }
  }
</style>
