import UsersTable from "@/components/users/table"

const UsersPage = async (props: any) => {
	const perPage = 5;
	const page = (props?.searchParams?.page) ?? 1

	const res = await fetch(
		`http://localhost:8000/users?_page=${page}&_limit=${perPage}`, 
		{
			method: 'GET',
			next: { tags: ['list-user'] }
		}
	)

	const total_items = +(res.headers?.get("X-Total-Count") ?? 0)
	
	const data = await res.json()

	return (
		<div>
				<UsersTable 
					users={data ?? []} 
					meta={{
						current: page,
						pageSize: perPage,
						total: total_items
					}}
				/>
		</div>
	)
}

export default UsersPage