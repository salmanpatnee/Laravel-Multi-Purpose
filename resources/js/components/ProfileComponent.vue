<template>
    <div class="col-md-12">
        <div class="card card-widget widget-user shadow">
            <div class="widget-user-header bg-info">
                <h3 class="widget-user-username">{{ this.form.name }}</h3>
                <h5 class="widget-user-desc">{{ this.form.email }}</h5>
            </div>
            <div class="widget-user-image">
                <img class="img-circle elevation-2" :src="getProfileImage()" alt="User Avatar">
            </div>
            <div class="card-footer">
                <div class="row">
                    <div class="col-sm-4 border-right">
                        <div class="description-block">
                            <h5 class="description-header">3,200</h5>
                            <span class="description-text">SALES</span>
                        </div>
                    </div>
                    <div class="col-sm-4 border-right">
                        <div class="description-block">
                            <h5 class="description-header">13,000</h5>
                            <span class="description-text">FOLLOWERS</span>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="description-block">
                            <h5 class="description-header">35</h5>
                            <span class="description-text">PRODUCTS</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header p-2">
                <ul class="nav nav-pills">
                    <li class="nav-item">
                        <a class="nav-link active" href="#settings" data-toggle="tab">
                            Profile Settings
                        </a>
                    </li>
                </ul>
            </div>
            <div class="card-body">
                <div class="tab-content">
                    <div class="tab-pane active" id="settings">
                        <form class="form-horizontal" @submit.prevent="update" @keydown="form.onKeydown($event)">
                            <div class="form-group row">
                                <label for="name" class="col-sm-2 col-form-label">Name</label>
                                <div class="col-sm-10">
                                    <input v-model="form.name" type="text" class="form-control" id="name"
                                        placeholder="Name">
                                    <HasError :form="form" field="name" />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="email" class="col-sm-2 col-form-label">Email</label>
                                <div class="col-sm-10">
                                    <input v-model="form.email" type="email" class="form-control" id="email"
                                        placeholder="Email">
                                    <HasError :form="form" field="email" />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="password" class="col-sm-2 col-form-label">Password</label>
                                <div class="col-sm-10">
                                    <input v-model="form.password" @change="checkPasswordField" type="password"
                                        class="form-control" id="password" placeholder="Password">
                                    <HasError :form="form" field="password" />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="image" class="col-sm-2 col-form-label">Profile Image</label>
                                <div class="col-sm-10">
                                    <div class="input-group">
                                        <div class="custom-file">
                                            <input type="file" @change="uploadFile" class="custom-file-input"
                                                id="image">
                                            <label class="custom-file-label" for="image">Choose file</label>
                                        </div>
                                        <div class="input-group-append">
                                            <span class="input-group-text">Upload</span>
                                        </div>
                                        <HasError :form="form" field="image" />
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="offset-sm-2 col-sm-10">
                                    <Button :form="form" class="btn btn-primary">Save </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        form: Form.make({
            id: '',
            name: '',
            email: '',
            password: '',
            image: null
        })
    }),
    methods: {
        checkPasswordField() {
            if (this.form.password.length === 0) this.form.password = undefined;
        },
        getProfileImage() {
            return (this.form.image.length > 200)
                ? this.form.image
                : 'img/profile/' + this.form.image;
        },
        getUser() {
            this.form.get('/api/user/profile').then(({ data }) => (this.form.fill(data)));
        },
        uploadFile(e) {
            let file = e.target.files[0];
            if (file['size'] <= '2097152') {

                let reader = new FileReader()

                reader.onloadend = (file) => {
                    this.form.image = reader.result;
                }

                reader.readAsDataURL(file);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'You are uploading a large file.',
                })
            }
        },

        update() {
            this.$Progress.start();
            this.form.put('/api/user/profile').then(() => {

                Toast.fire({
                    icon: 'success',
                    title: 'Profile updated successfully'
                });

                this.$Progress.finish();
            }).catch((error) => {
                this.$Progress.fail();
                console.log('Error', error);
            });
        }


    },
    created() {
        this.getUser();
    }
}
</script>
