import React, { useState } from 'react'
import TFCommonModal from './common/modals/TFCommonModal'
import TFCommonDrawer from './common/TFCommonDrawer'
import { Button } from './ui/button'
import { Input } from './ui/input'

function FeatureCheck() {

    const [open, setOpen] = useState(false);

  return (
    <div className='flex flex-col h-screen'>
        <div className="flex flex-col justify-center">
      <h3 className='text-2xl font-bold mt-2 text-center'>Feature Check</h3>
        {/* <p className='ms-3 font-semibold'>TFCommonModal:</p> */}
        </div>
        {/* <Button onClick={() => setOpen(true)}>Open Modal</Button>
         */}
        {/* <TFCommonModal
            open={open}
            onOpenChange={setOpen}
            title="Feature Check Modal"
            description="lorem ipsum gen"
            trigger={
                <Button vrariant="outline" className='ms-3 mt-2'>
                    Click to open
                </Button>
            }
            footer={
                <div className='flex flex-col-reverse sm:flex-row sm:justify-end gap-2'>
                <Button variant='outline' className={" sm:auto"} onClick={() => setOpen(false)}>
                    Close
                </Button>
                <Button onClick={() => setOpen(false)}>
                    Save
                </Button>
                </div>
            }
        >
            Hello
        </TFCommonModal> */}
        <p className='ms-3 font-semibold'>TFCommonDrawer:</p>
        <TFCommonDrawer
            trigger={<Button>Create Task</Button>}
            title={"Create Task"}
            description={"Add a new task"}
            contentClassName={"h-[90vh]"}
            footer={
                <>
                <Button>Create Task</Button>
                <Button>Cancel</Button>
                </>
            }
        >
            form content
        </TFCommonDrawer>


          {/* <div className="bg-cyan-50 flex flex-col">


              <h2 className='text-left text-xl font-bold mb-3'>Font styles :</h2>
              <div className=" grid grid-cols-4 font-semibold">
                  <p className='font-sans text-5xl'>TaskForge</p>
                  <p className='font-serif text-5xl'>TaskForge</p>
                  <p className='font-mono text-5xl'>TaskForge</p>
                  <p className='font-thin text-5xl'>TaskForge</p>
                  <p className='font text-5xl font-[Pacifico]'>TaskForge</p>
              </div>
          </div> */}
    </div>
  )
}

export default FeatureCheck
