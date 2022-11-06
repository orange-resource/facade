<template>
  <div>
    <Row class="expand-row">
      <Col span="24">
        <span class="expand-key">版块名称: </span>
        <span class="expand-value">{{ row.name }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="24">
        <span class="expand-key">版块描述: </span>
        <span class="expand-value">{{ row.description }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="24">
        <span class="expand-key">打开链接: </span>
        <span class="expand-value">{{ row.openUrl }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="24">
        <span class="expand-key">关闭访问显示文本: </span>
        <span class="expand-value">{{ row.offText }}</span>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: "sectionTableExpand",
    props: {
      row: {
        type: Object
      }
    }
  }
</script>

<style lang="scss" scoped>
  .expand-row{
    margin-bottom: 16px;
  }
</style>
