// The comment sheet that slides up over a reel.
// Figma: covers the bottom 67% of the screen, see-through olive-grey (#55574A), rounded top,
// "1,247 Comments" in yellow, sort and close icons, the list, and the comment box at the bottom.
//
// It keeps its own list: new comments go to the top, liking a comment adds 1, Reply fills in
// "replying to @name". Nothing is sent to a server yet (no comments API).
//
// `panel`: the desktop player shows the same comments as a box beside the reel
// (Figma "Comment Section - Desktop") instead of a sheet sliding up from the bottom.
import { useRef, useState } from 'react'
import { ArrowDownWideNarrow, X } from 'lucide-react'
import CommentItem from './CommentItem.jsx'
import CommentBox from './CommentBox.jsx'
import NoComments from './NoComments.jsx'

export default function CommentsSheet({ reel, myAvatar, requireSignIn, onClose, onCountChange, panel = false }) {
  const [comments, setComments] = useState(reel.comments)
  const [likedIds, setLikedIds] = useState([])
  const [replyingTo, setReplyingTo] = useState(null)
  const [sortByTop, setSortByTop] = useState(false)
  const boxRef = useRef(null)

  const total = reel.commentCount + (comments.length - reel.comments.length)
  const shown = sortByTop ? [...comments].sort((a, b) => b.likes - a.likes) : comments

  const focusBox = () => {
    if (requireSignIn()) boxRef.current?.focus()
  }

  const addComment = (text) => {
    const newComment = {
      id: `mine-${Date.now()}`,
      handle: '@You',
      avatar: myAvatar,
      text: replyingTo ? `${replyingTo} ${text}` : text,
      time: 'now',
      ago: 'just now',
      likes: 0,
    }
    setComments((list) => [newComment, ...list])
    setReplyingTo(null)
    onCountChange(1)
  }

  // Liking works for everyone (like the reel's heart); only writing/replying asks for an account
  const toggleLike = (id) => {
    setLikedIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]))
  }

  const reply = (handle) => {
    if (!requireSignIn()) return
    setReplyingTo(handle)
    focusBox()
  }

  return (
    <div
      className={
        panel
          ? 'flex size-full flex-col overflow-hidden rounded-[calc(20*var(--d))] border border-white/15 bg-[#55574a]/95 pt-2.5 backdrop-blur-xl'
          : 'fixed inset-x-0 bottom-0 z-[60] flex h-[67%] flex-col rounded-t-[28px] border-t border-white/20 bg-[#55574a]/95 backdrop-blur-xl'
      }
    >
      {/* The little drag handle only makes sense on the phone sheet */}
      {!panel && <span className="mx-auto mt-2.5 h-1 w-9 shrink-0 rounded-full bg-white/40" />}

      <div className="relative flex h-11 shrink-0 items-center justify-center border-b border-white/10">
        <h2 className="text-xs font-semibold text-brand">
          {total > 0 ? `${total.toLocaleString()} Comments` : 'No Comments'}
        </h2>
        <div className="absolute right-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSortByTop((s) => !s)}
            aria-label={sortByTop ? 'Sort by newest' : 'Sort by most liked'}
            className={sortByTop ? 'text-brand' : 'text-white'}
          >
            <ArrowDownWideNarrow size={16} />
          </button>
          <button type="button" onClick={onClose} aria-label="Close comments">
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="no-scrollbar flex-1 overflow-y-auto">
        {shown.length === 0 ? (
          <NoComments onCommentFirst={focusBox} />
        ) : (
          <div className="flex flex-col gap-4 px-4 py-4">
            {shown.map((c) => (
              <CommentItem
                key={c.id}
                comment={c}
                liked={likedIds.includes(c.id)}
                onLike={() => toggleLike(c.id)}
                onReply={() => reply(c.handle)}
              />
            ))}
          </div>
        )}
      </div>

      <CommentBox
        ref={boxRef}
        avatar={myAvatar}
        replyingTo={replyingTo}
        onSubmit={addComment}
        onFocusAttempt={requireSignIn}
      />
    </div>
  )
}
