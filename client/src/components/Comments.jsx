import React from 'react'
import CommentShow from './CommentShow'

const Comments = ({slug}) => {
  return (
    <div className=' flex flex-col gap-8 lg:w-3/5  bg-slate-50 '>
        <h1 className='text-xl text-gray-500 underline mt-4'>
            Comments
        </h1>
        <div className='flex items-center justify-between gap-8 w-full '>
            <textarea placeholder='comment here...' className='w-full rounded-xl p-2  border-black border-2'></textarea>
            <button className='bg-blue-600 px-4 py-2 rounded-lg text-white'>Send</button>
        </div>
        <CommentShow postSlug={slug} />
        
    </div>
  )
}

export default Comments