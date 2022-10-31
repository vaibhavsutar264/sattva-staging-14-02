import { useRouter } from 'next/router'


const option = (context) => {
    const router = useRouter()
    console.log(router.query);
    return (
        <div>
            <h1>{context.id}</h1>

        </div>
    );
}



export default option;