<template>
    <div class="layout">
        <Layout>
            <div style="width:20%">
            <Sider hide-trigger :style="{background: '#fff'}">
                <Upload
                    multiple
                    type="drag"
                    name="avatar"
                    action="http://localhost:3000/upload/uploadFile">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p style=" font-size:20px;color:blue">点　击　上　传</p>
                    </div>
                </Upload>
            </Sider>
            </div>
        </Layout>
        
    </div>
</template>

<script>

</script>





