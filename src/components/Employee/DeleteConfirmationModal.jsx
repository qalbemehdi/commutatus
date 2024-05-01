import Modal from '../Modal';
import CTA from '../CTA';

export default function DeleteConfirmationModal({ isOpen, onClose, onDelete }) {
    return (
        <Modal title="Delete Employee" isOpen={isOpen} toggleModal={onClose}>
            <p>Are you sure you want to delete this employee?</p>
            <p className='mt-2 text-sm'>Note: Removing this employee will also update associated teams.</p>
            <div className="flex justify-end mt-6 gap-3">
                <CTA title="Delete" variant="danger" onClick={onDelete} className="max-w-fit" />
                <CTA title="Cancel" onClick={onClose} className="max-w-fit" />
            </div>
        </Modal>
    );
};
