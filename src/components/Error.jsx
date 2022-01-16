
export const Error = ({error}) => {
    return (
        <div className="bg-red-800 text-white text-center p-3 uppercase font-bold mb-3 rounded-md">
            <p>{error}</p>
        </div>
    )
}
