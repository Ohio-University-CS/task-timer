// Get the tasks
//      supabase: SuperbaseClient
//      userId: UUID
export async function getTasks(supabase, userId) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId)
    .order('due_date', { ascending: true })

  if (error) throw error
  return data
}

// Get the task with the given id
//      supabase: SuperbaseClient
//      taskId: UUID
export async function getTaskById(supabase, taskId) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', taskId)
    .single()

  if (error) throw error
  return data
}

// Get the task with the given id
//      supabase: SuperbaseClient
//      userId: UUID
//      completed: bool
export async function getTasksByCompletion(
  supabase,
  userId,
  completed
) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId)
    .eq('completed', completed)
    .order('due_date', { ascending: true })

  if (error) throw error
  return data
}