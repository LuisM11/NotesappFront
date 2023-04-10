import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { StickySVG } from '../assets/StickySVG'
import { DeleteOutlined, EditOutlined, InboxOutlined, PlusCircleFilled, LoadingOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { Modal, Spin, Form, Input, Select, Button, notification } from 'antd';
import { useNoteQuery, useNotesQuery } from '../hooks/useNotesQuery'
import { useCategoriesFetch } from '../hooks/useCategoriesFetch'
import { extractCategories } from '../utils/extractCategories';
import { useNotesMutation } from '../hooks/useNotesMutation';


const { TextArea } = Input;
const { Option } = Select;
const { confirm } = Modal;

export const ActiveNotes = () => {

    const openNotification = () => {
        api.success({
            message: "Action completed successfully   ",
            /* description: "Note created successfully", */
            placement: "bottomRight",
            duration: 2,
        });
    }
    const showConfirm = (id, type) => {
        const actions = {
            delete: { message: "Do you Want to delete this note?", function: deleteNote.mutate },
            archive: { message: "Do you Want to archive this note?", function: patchNote.mutate },
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
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [noteID, setnoteID] = useState(0)
    const [typeModal, setTypeModal] = useState(null);
    
    const notes = useNotesQuery(false)
    const note = useNoteQuery(noteID, form)
    const newNote = useNotesMutation("post", openNotification)
    const deleteNote = useNotesMutation("delete", openNotification)
    const patchNote = useNotesMutation("patch", openNotification)
    const updateNote = useNotesMutation("put", openNotification)
    const categories = useCategoriesFetch()

    const onFinish = async (values) => {
        const { categories1, newCategories } = extractCategories(values.category, categories.data.data);
        delete values.category;
        const datatoFetch = { ...values, categories: categories1, newCategories }
        if(typeModal==="create"){
            newNote.mutate(datatoFetch)
        }else{
            updateNote.mutate({id:note.data.data.id , note: datatoFetch})
        }
        /* newNote.mutate(datatoFetch) */
        form.resetFields()
        setIsModalOpen(false)
    };

    const showModal = (type, id) => {
        setIsModalOpen(true);
        setTypeModal(type);
        if (type === "edit" ) {
            setnoteID(id)
            if (noteID !== 0) {
                note.refetch()
            }
        }
    };
    const handleOk = () => {
        setIsModalOpen(false);
        setTypeModal(null);
        form.resetFields()
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setTypeModal(null);
        form.resetFields()
    };

    useEffect(() => {


        return () => {

        }
    }, [])



    return (
        <>
            {contextHolder}
            <header className='flex justify-between items-center px-4'>
                <h1 className='font-bold text-4xl my-auto text-white'>My Notes</h1>
                <div className='flex space-x-3 items-center'>
                    <Link to='../archived' className='underline text-white'>
                        Archived Notes
                    </Link>
                    <button onClick={() => showModal("create")} className='bg-white/30 rounded-lg h-12 pl-2 pr-3 text-white space-x-1 flex items-center hover:shadow-md hover:shadow-white/30'>
                        <PlusCircleFilled className='flex items-center justify-center text-2xl text-white w-8 h-8' />
                        <span className='text-lg'>New Note</span>
                    </button>
                </div>
            </header>
            <Modal className='prmAntB'
                title={<div className='font-semibold text-lg text-[#2c3e50] border-b'>{typeModal == "edit" ? "Edit Note" : "Create Note"}</div>}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                cancelButtonProps={{ style: { display: 'none' } }}>
                {note.isFetching ? <Spin spinning={note.isFetching} indicator={<LoadingOutlined className='' spin />} /> :
                    <Form layout='vertical'
                        form={form}
                        onFinish={onFinish}
                        
                    >

                        <Form.Item
                            name="title"
                            label="Title"
                            rules={[{ required: true, message: 'Tittle is required' },
                            { max: 50, message: 'Tittle must be fewer than 50 characters' }
                            ]}
                        >
                            <Input placeholder="Enter a tittle" />
                        </Form.Item>

                        <Form.Item
                            name="content"
                            label="Content"
                            rules={[{ required: true, message: 'Content is required' },
                            { max: 1000, message: 'Content must be fewer than 1000 characters' }]}
                        >
                            <TextArea placeholder="Enter note content" />
                        </Form.Item>

                        <Form.Item
                            name="category"
                            label="Categories"
                            rules={[{ required: true, message: 'At least one category is required ' }]}
                        >
                            <Select  mode="tags" placeholder="Select categories or create new ones"  >
                                {(categories.data && categories.data.status != 204) && categories.data.data.map((category) => {
                                    return (
                                        <Option key={category.id} value={String(category.id)}>
                                            {category.name}
                                        </Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                }

            </Modal>

            {notes.isFetching ? <Spin spinning={notes.isFetching} indicator={<LoadingOutlined className='text-white' spin />} /> :
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
                                    <div className='w-full space-x-3 flex  h-8 content-center'>
                                        <EditOutlined onClick={() => showModal("edit", note.id)} title='Edit' className='flex justify-center text-xl rounded w-8 h-full bg-white/30 hover:cursor-pointer hover:text-blue-400' />
                                        <InboxOutlined onClick={() => showConfirm(note.id, "archive")} title='Archive' className='flex justify-center text-xl rounded w-8 h-full bg-white/30 hover:cursor-pointer hover:text-yellow-400' />
                                        <DeleteOutlined onClick={() => showConfirm(note.id, "delete")} title='Delete' className='flex justify-center text-xl rounded w-8 h-full bg-white/30 hover:cursor-pointer hover:text-red-500' />
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
