import Navbar from '../../components/Navbar/Navbar'
import DisplayPDF from '../../components/DisplayPDF/DisplayPDF'

function ResumePage() {
  return (
    <>
        <Navbar />
        <DisplayPDF source={'/Resume.pdf'} title={'Resume'} />
    </>
    
  )
}

export default ResumePage
