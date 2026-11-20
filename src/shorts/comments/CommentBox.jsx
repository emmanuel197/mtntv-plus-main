// The "Add a comment..." box at the bottom of the comment sheet.
// Not typing: one line, white with a yellow border. Typing: a row of quick emojis appears above,
// the box grows, and a "32 / 150" counter shows. Enter posts; Shift+Enter makes a new line.
import { forwardRef, useState } from 'react'

const MAX_LENGTH = 150
const QUICK_EMOJIS = ['😊', '👌', '💕', '🤔', '🙌', '😂']

// forwardRef lets the sheet reach the text box, to put the cursor in it ("Comment First", "Reply")
const CommentBox = forwardRef(function CommentBox({ avatar, replyingTo, onSubmit, onFocusAttempt }, ref) {
  const [text, setText] = useState('')
  const [focused, setFocused] = useState(false)

  const submit = () => {
    const clean = text.trim()
    if (!clean) return
    onSubmit(clean)
    setText('')
  }

  const placeholder = replyingTo ? `replying to ${replyingTo}` : 'Add a comment...'
  const typing = focused || text.length > 0

  return (
    <div className="px-4 pt-2 pb-[30px]">
      {typing && (
        <div className="mb-3 flex justify-between px-1 text-xl">
          {QUICK_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              // onMouseDown + preventDefault keeps the text box focused while tapping an emoji
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setText((t) => (t + emoji).slice(0, MAX_LENGTH))}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2.5">
        <img src={avatar} alt="" className="size-[34px] shrink-0 rounded-full object-cover" />
        <div className={`relative flex-1 rounded-[22px] border-[1.5px] border-brand bg-white ${typing ? 'min-h-[58px]' : 'h-11'}`}>
          <textarea
            ref={ref}
            value={text}
            maxLength={MAX_LENGTH}
            rows={typing ? 2 : 1}
            placeholder={placeholder}
            // Pressing the box: signed-out people get the sign-in prompt, and the box doesn't open
            onPointerDown={(e) => {
              if (onFocusAttempt() === false) e.preventDefault()
            }}
            // Reaching the box with the Tab key: same check
            onFocus={(e) => {
              // Signed-out people get the sign-in prompt instead of typing
              if (onFocusAttempt() === false) {
                e.target.blur()
                return
              }
              setFocused(true)
            }}
            onBlur={() => setFocused(false)}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                submit()
              }
            }}
            className="block w-full resize-none bg-transparent px-4 py-3 text-[13px] leading-[18px] text-black outline-none placeholder:text-[#9b9b9b]"
          />
          {typing && (
            <span className="absolute right-4 bottom-1.5 text-[9px] text-[#9b9b9b]">
              {text.length} / {MAX_LENGTH}
            </span>
          )}
        </div>
      </div>
    </div>
  )
})

export default CommentBox
