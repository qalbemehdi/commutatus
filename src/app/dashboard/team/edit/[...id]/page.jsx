import EditTeamForm from "@/components/Teams/EditTeamForm";

export default function EditTeam() {
    return (
        <div className="flex justify-center h-screen items-center p-5">
            <div className="max-w-lg p-10 inline-block align-bottom bg-white rounded-lg text-left shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <h1 className="text-2xl font-bold text-center mb-6">Update Team</h1>
                <EditTeamForm />
            </div>
        </div>
    );
}