import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { StickySVG } from '../assets/StickySVG'
import { LoadingOutlined, ExclamationCircleFilled,RollbackOutlined } from '@ant-design/icons'
import { Modal, Spin,  notification } from 'antd';
import { useNotesQuery } from '../hooks/useNotesQuery'
import { useNotesMutation } from '../hooks/useNotesMutation';


const {confirm} = Modal;

export const ArchivedNotes = () => {

    const openNotification = () => {
        api.success({
            message: "Action completed successfully   ",
            /* description: "Note created successfully", */
            placement: "bottomRight",
            duration: 2,
        });
    }
    const showConfirm = (id,type) => {
        const actions ={
            unarchive: {message:"Do you Want to restore this note?", function: patchNote.mutate},
        }
        confirm({
          title: actions[type].message,
          icon: <ExclamationCircleFilled />,
          className: 'prmAntB',
          onOk() {
            actions[type].function(id)
            
          },
          onCancel() {
          },
        });
      };
    const [api, contextHolder] = notification.useNotification();
    
    const notes = useNotesQuery(true)
    const patchNote = useNotesMutation("patch", openNotification)

    return (
        <>
            {contextHolder}
            <header className='flex justify-between items-center px-4'>
                <h1 className='font-bold text-4xl my-auto text-white'>Archived Notes</h1>
                <div className='flex space-x-3 items-center'>
                    <Link to='../active' className='underline text-white'>
                        Back to My Notes
                    </Link>             
                </div>
            </header>
            

            {notes.isFetching ? <Spin spinning={notes.isFetching} indicator={<LoadingOutlined className=' text-white' spin />} /> :
                <div className='mx-4 flex gap-10 justify-center content-start flex-wrap'>
                    {(notes.data && notes.data.status != 204) && notes.data.data.map((note) => {
                        return (
                            <div key={note.id} className='min-w-[360px] shadow-md w-[27%] bg-[#2c3e50] rounded h-44 flex items-center'>
                                <StickySVG />
                                <div className='w-[60%] h-full flex flex-col justify-between text-white font-semibold py-4 px-2'>
                                    <h2 className=''>{note.title}</h2>
                                    <p className='font-normal space-x-1'>
                                        Updated: <span className='font-light'>{`${note.lastModified[2]}/${note.lastModified[1]}/${note.lastModified[0]} ${note.lastModified[3]}:${note.lastModified[4]}:${note.lastModified[5]}`}</span>
                                    </p>
                                    <div className='w-full space-x-3 flex justify-end  h-8 content-center'>
                                        <RollbackOutlined onClick={()=> showConfirm(note.id,"unarchive")} title='Unarchive' className='mr-4 flex justify-center text-xl rounded w-8 h-full bg-white/30 hover:cursor-pointer hover:text-blue-400' />
                                       
                                    </div>
                                </div>

                            </div>
                        )
                    }
                    )}
                </div>
            }
        </>
    )
}
