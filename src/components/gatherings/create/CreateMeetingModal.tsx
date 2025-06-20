'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/common/dialog';
import CreateMeetingForm from './CreateMeetingForm';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CreateMeetingModal({ open, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px]">
        <DialogHeader>
          <DialogTitle>모임 만들기</DialogTitle>
        </DialogHeader>
        <CreateMeetingForm onSuccess={onClose} />
      </DialogContent>
    </Dialog>
  );
}
