import { Form, Input, Modal, Radio } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useContext, useEffect } from 'react';
import { PostContext } from '../../contexts/PostProvider';

function ModalFormPost({
  isVisibleModal,
  handleModalClose,
  typeModal,
  dataFormModal,
}) {
  //context
  const { addPost, editPost } = useContext(PostContext);
  const [form] = Form.useForm();
  //sumit modal form
  const submitModalForm = () => {
    form.submit();
    const validate = form.isFieldValidating('title');
    const values = form.getFieldsValue();
    if (validate) {
      if (typeModal === 'Add') {
        addPost(values);
      } else if (typeModal === 'Edit') {
        editPost(values, dataFormModal._id);
      }
      handleModalClose();
    }
  };
  //effect
  useEffect(() => {
    form.setFieldsValue(dataFormModal);
  }, [dataFormModal]);
  return (
    <>
      <Modal
        title={`${typeModal} Post`}
        visible={isVisibleModal}
        onOk={submitModalForm}
        onCancel={handleModalClose}
        okText={`${typeModal === 'Add' ? typeModal : 'Save'}`}
        okButtonProps={{ style: { background: '#1890ff', color: 'white' } }}
        className="modal_post top-6 md:top-[90px] lg:top-[100px]"
      >
        <Form name="form_post" layout="vertical" form={form}>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: 'Please input your title',
              },
            ]}
          >
            <Input placeholder="Enter title" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <TextArea placeholder="Enter description" />
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Radio.Group onChange={() => {}} size="small">
              <Radio.Button value="TO LEARN" className="text-volcano">
                TO LEARN
              </Radio.Button>
              <Radio.Button value="LEARNING" className="text-gold">
                LEARNING
              </Radio.Button>
              <Radio.Button value="LEARNED" className="text-green">
                LEARNED
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="url" label="URL Video">
            <Input placeholder="Enter URL Video Youtube ..." />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalFormPost;
