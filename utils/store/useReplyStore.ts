import { create } from 'zustand';
import { getReplyListRPC, submitReply } from '../supabase/reply';

type ReplyStore = {
  replyList: Reply[];
  getReplyList: (writing_id: number) => void;
  addReply: (replyModel: ReplyForPost) => Promise<boolean>;
};

const useReplyStore = create<ReplyStore>((set, get) => ({
  replyList: [],
  getReplyList: async (writing_id: number) => {
    const data = await getReplyListRPC(writing_id);
    set({ replyList: data });
  },
  addReply: async (replyModel: ReplyForPost) => {
    const result = await submitReply(replyModel);
    if (result) {
      await get().getReplyList(replyModel.writing_id);
    }
    return result;
  },
}));

export default useReplyStore;
