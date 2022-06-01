<template>
   <div class="row">
   <div class="col-12">
      <div class="card">
         <div class="card-header">
            <h3 class="card-title mt-2">Users</h3>
            <div class="card-tools">
               <button class="btn btn-primary" data-toggle="modal" data-target="#user-modal">
               Add New User
               </button> 
            </div>
         </div>
         <div class="card-body table-responsive p-0">
            <table class="table table-head-fixed text-nowrap">
               <thead>
                  <tr>
                     <th>ID</th>
                     <th>Name</th>
                     <th>Email</th>
                     <th>Role</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td>183</td>
                     <td>John Doe</td>
                     <td>11-7-2014</td>
                     <td><span class="tag tag-success">Approved</span></td>
                     <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
   </div>
   <div class="modal fade" id="user-modal" style="display: none;" aria-hidden="true">
      <div class="modal-dialog">
         <div class="modal-content">
            <form @submit.prevent="createUser" @keydown="form.onKeydown($event)">
               <div class="modal-header">
                  <h4 class="modal-title">Add User</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
               </div>
               <div class="modal-body">
                  <input v-model="form.name" type="text" name="name" placeholder="Name" class="form-control">
                  <div v-if="form.errors.has('name')" v-html="form.errors.get('name')" />
                    <input v-model="form.email" type="email" name="email" placeholder="Email" class="form-control">
                  <div v-if="form.errors.has('email')" v-html="form.errors.get('email')" />
                    <input v-model="form.password" type="password" name="password" placeholder="Password" class="form-control">
                  <div v-if="form.errors.has('password')" v-html="form.errors.get('password')" />
                  </div>
                  <div class="modal-footer justify-content-between">
                     <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                     <button type="submit" class="btn btn-primary" :disabled="form.busy"> Add User</button>
                  </div>
            </form>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
   export default {
        data: () => ({
            form: new Form({
                name: '',
                email: '',
                password: '',
            })
        }),
   
   methods: {
    async createUser () {
      const response = await this.form.post('/api/users')
      console.log(response);
    }
   },
       mounted() {
           console.log('Component mounted.')
       }
   }
</script>