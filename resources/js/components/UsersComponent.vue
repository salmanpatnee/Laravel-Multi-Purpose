<template>
   <div class="row">
      <div class="col-12">
         <div class="card">
            <div class="card-header">
               <h3 class="card-title mt-2">Users</h3>
               <div class="card-tools">
                  <button class="btn btn-primary" @click="create">
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
                        <th>Registered At</th>
                        <th></th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr v-for="user in users" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.created_at | formatteddDate }}</td>
                        <td>
                           <div class="btn-group" role="group">
                              <button @click="edit(user)" type="button" class="btn btn-info text-light">Edit</button>
                              <button @click="deleteUser(user.id)" type="button" class="btn btn-danger">Delete</button>
                           </div>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </div>
      <div class="modal fade" id="user-modal" style="display: none;" aria-hidden="true">
         <div class="modal-dialog">
            <div class="modal-content">
               <form @submit.prevent="editMode ? update() : store()" @keydown="form.onKeydown($event)">
                  <div class="modal-header">
                     <h4 class="modal-title">{{ editMode ? "Update" : "Add" }} User</h4>
                     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                     </button>
                  </div>
                  <div class="modal-body">
                     <div class="form-group">
                        <input v-model="form.name" type="text" name="name" placeholder="Name" class="form-control">
                        <HasError :form="form" field="name" />
                     </div>
                     <div class="form-group">
                        <input v-model="form.email" type="email" name="email" placeholder="Email" class="form-control">
                        <HasError :form="form" field="email" />
                     </div>
                     <div class="form-group">
                        <input v-model="form.password" type="password" name="password" placeholder="Password"
                           class="form-control">
                        <HasError :form="form" field="password" />
                     </div>
                  </div>
                  <div class="modal-footer justify-content-between">
                     <button @click="hideModal('user-modal')" type="button" class="btn btn-default"
                        data-dismiss="modal">Close</button>
                     <Button :form="form" class="btn btn-primary">{{ editMode ? "Update" : "Add" }} </Button>

                     <!-- <button type="submit" class="btn btn-primary" :disabled="form.busy"> Add User</button> -->
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
      users: {},
      editMode: false,
      form: new Form({
         id: '',
         name: '',
         email: '',
         password: '',
      })
   }),

   methods: {
      create() {
         this.editMode = false;
         this.form.reset();
         $('#user-modal').modal('show');
      },
      edit(user) {
         this.editMode = true;
         this.form.reset();
         this.form.fill(user);
         $('#user-modal').modal('show');
      },
      hideModal(modalId) {
         $('#' + modalId).modal('hide');
      },
      async deleteUser(id) {

         Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
         }).then((result) => {
            if (result.isConfirmed) {
               this.$Progress.start();
               this.form.delete('/api/users/' + id).then(() => {

                  Toast.fire({
                     icon: 'success',
                     title: 'User Deleted.'
                  });


                  Fire.$emit('refreshUsers');

                  this.$Progress.finish();
               }).catch((error) => {
                  console.log('Error', error);
               });
            }
         })
      },
      async store() {
         this.$Progress.start();
         await this.form.post('/api/users').then(() => {
            Fire.$emit('refreshUsers');

            $('#user-modal').modal('hide');

            Toast.fire({
               icon: 'success',
               title: 'Signed in successfully'
            });

            this.$Progress.finish();
         }).catch((error) => {
            console.log('Error', error);
         });

      },
      update() {
         this.$Progress.start();
         this.form.put('/api/users/' + this.form.id).then(() => {
            Fire.$emit('refreshUsers');

            $('#user-modal').modal('hide');

            Toast.fire({
               icon: 'success',
               title: 'User updated successfully'
            });
            this.$Progress.finish();
         }).catch((error) => {
            this.$Progress.fail();
            console.log('Error', error);
         });
      },
      getUsers() {
         this.form.get('/api/users').then(({ data }) => (this.users = data.data));
      }
   },
   created() {
      this.getUsers();

      Fire.$on('refreshUsers', () => {
         this.getUsers();
      });
   }
}
</script>