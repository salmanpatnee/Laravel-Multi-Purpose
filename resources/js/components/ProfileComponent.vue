<template>
    <div class="col-md-12">

        <div class="card card-widget widget-user shadow">

            <div class="widget-user-header bg-info">
                <h3 class="widget-user-username">{{ this.form.name }}</h3>
                <h5 class="widget-user-desc">{{ this.form.email }}</h5>
            </div>
            <div class="widget-user-image">
                <!-- <img class="img-circle elevation-2" :src="'/images/user.png'" alt="User Avatar"> -->
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
                    <li class="nav-item"><a class="nav-link active" href="#settings" data-toggle="tab">Settings</a></li>
                </ul>
            </div>
            <div class="card-body">
                <div class="tab-content">

                    <div class="tab-pane active" id="settings">
                        <form class="form-horizontal" @submit.prevent="update" @keydown="form.onKeydown($event)">
                            <div class="form-group row">
                                <label for="inputName" class="col-sm-2 col-form-label">Name</label>
                                <div class="col-sm-10">
                                    <input v-model="form.name" type="text" class="form-control" id="inputName"
                                        placeholder="Name">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
                                <div class="col-sm-10">
                                    <input v-model="form.email" type="email" class="form-control" id="inputEmail"
                                        placeholder="Email">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="profile_photo" class="col-sm-2 col-form-label">Profile Photo</label>
                                <div class="col-sm-10">
                                    <input type="file" @change="uploadFile" class="form-control" id="profile_photo">
                                </div>
                            </div>
                            <div v-if="form.progress">Progress: {{ form.progress.percentage }}%</div>
                            <div class="form-group row">
                                <div class="offset-sm-2 col-sm-10">
                                    <button type="submit" class="btn btn-danger">Submit</button>
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
            image: null
        })
    }),
    methods: {
        getUser() {
            this.form.get('/api/user/profile').then(({ data }) => (this.form.fill(data)));
        },
        uploadFile(e) {
            const image = e.target.files[0];

            this.form.image = image;
        },

        update() {
            // let formData = new FormData();
            // formData.append('image', this.form.image);

            // this.form.put('/api/user/profile', formData).then(res => {
            //     console.log(res);
            // }).catch(error => console.log(error));

            let data = new FormData();

            data.append('name', 'my-file')
            data.append('file', this.form.image)

            let config = {
                header: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            axios.put('/api/user/profile', data, config).then(response => {
                console.log(response);
            }).catch(e => {
                console.log(e);
            });
        }


    },
    created() {
        this.getUser();
    }
}
</script>
