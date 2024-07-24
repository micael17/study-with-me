import { create } from 'zustand';
import { getReplyListRPC, submitReply } from '../supabase/reply';

type ReplyStore = {
  needRefresh: boolean;
  setNeedRefresh: (flag: boolean) => void;
};

const useReplyStore = create<ReplyStore>((set) => ({
  needRefresh: false,
  setNeedRefresh: (flag) => {
    set({ needRefresh: flag });
  },
}));

export default useReplyStore;
