
import { Pie, Line, Doughnut, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
)

const Adahack = () => {
  const data = {
    labels: ['FOOD', 'SHOPPING', 'MISCELLIANCE', 'UTILITIES', 'RENT'],
    datasets: [
      {
        label: 'My Dataset',
        data: [300, 50, 10,10,20],
        backgroundColor: ['#FFBD88', '#FCE883', '#ACE5EE', '#EBC7DF', '#38ffd4ff'],
        hoverOffset: 10,
        borderColor: '#737373',
      }
    ],
  }

  const data2 = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [
    {
      label: 'spend per year',
      data: [12, 19, 3, 5, 2],
      borderColor: '#737373',
      backgroundColor: '#737373',
      tension: 0.4, // smooth line
    }
  ],  
}

const progressData = {
  labels: ['Completed', 'Remaining'],
  datasets: [
    {
      data: [70, 30], // 70% completed
      backgroundColor: ['#C1CB79', '#E5E5E5'], // blue and gray
      borderWidth: 0,
    },
  ],
}
const progressData1 = {
  labels: ['Completed', 'Remaining'],
  datasets: [
    {
      data: [50, 50], // 70% completed
      backgroundColor: ['#C1CB79', '#E5E5E5'], // blue and gray
      borderWidth: 0,
    },
  ],
}
const progressData2 = {
  labels: ['Completed', 'Remaining'],
  datasets: [
    {
      data: [20, 80], // 70% completed
      backgroundColor: ['#C1CB79', '#E5E5E5'], // blue and gray
      borderWidth: 0,
    },
  ],
}

const progressOptions = {
  cutout: '70%', // makes it a donut
  plugins: {
    tooltip: { enabled: false }, // optional: hide tooltip
    legend: {
      display: false, // hides the legend
    },
  },
}

const barData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [
    {
      label: 'Monthly Spending',
      data: [12, 19, 3, 5, 2],
      backgroundColor: '#36A2EB',
    },
  ],
}

const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
    title: {
      display: true,
      text: 'Monthly Spending Bar Chart',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
}

  return (
    <div className='h-full bg-[#C1CB79] p-4 '>
      <div className='h-1/2 grid grid-cols-[37%_60.5%] gap-5 mb-4'>
        {/* Pie Chart Card */}
        <div className='!bg-white h-full rounded-lg flex flex-col items-center p-4'>
            <p>MONTHLY SPENDING</p>
          <div className='flex-1 w-full flex items-center justify-center'>
            <Pie data={data} options={{ maintainAspectRatio: false }} />
          </div>
          <div className='bg-[#F7EF7D] border-2 border-[#737373] rounded-2xl h-10 w-1/4 max-w-xs flex items-center justify-center mt-4'>
            VIEW
          </div>
        </div>
        <div className='!bg-white h-full rounded-lg content-center text-center p-3'>
            <p>OVERVIEW OF YOUR YEAR OF SPENDING</p>
            <Line data={data2} />
        </div>
      </div>
      <div className='h-[50%] grid grid-cols-[32.1%_32.1%_31%] gap-5 pb-4'>
        <div className='h-full  rounded-lg gap-3 grid grid-cols-2 text-center'>
          <div className='bg-white content-center rounded-lg p-8'>
            <p>SAVINGS</p>
            <Doughnut data={progressData} options={progressOptions} />
          </div>
          <div className='bg-white content-center rounded-lg p-8'>
            <p>SPENDING MONEYS </p>
            <Doughnut data={progressData1} options={progressOptions} />
          </div>
          <div className='bg-white content-center rounded-lg p-8'>
            <p>INVESTMENTS</p>
            <Doughnut data={progressData2} options={progressOptions} />
          </div>
          <div className='bg-white content-center rounded-lg p-8'>
            <p>+</p>
            <p>SEE HOW YOU ARE DOING MONEY WISE</p>
          </div>
        </div>
        <div className='h-full !bg-white rounded-lg p-7 '>
            <p className='text-center'>CASHFLOW FOR THE MONTH</p>
            <div className='h-full content-center'>
            <div>
                <p>EARNED</p>
              <div className="w-full bg-gray-200 rounded-full h-15 mb-20 ">
                <div
                    className="bg-[#C1CB79] h-16 rounded-full"
                    style={{ width: '70%' }} // 70% progress
                ></div>
                </div>
                <p>SPENT</p>
                <div className="w-full bg-gray-200 rounded-full h-16 ">
                <div
                    className="bg-[#FFBD88] h-16 rounded-full"
                    style={{ width: '30%' }} // 70% progress
                ></div>
                </div>
                </div>
            </div>
        </div>
        <div className='flex flex-col  text-center items-center justify-center h-full p-7'>
            <p>"MONEY MADE EASY"</p>
          <img src = '/moneyman.png' width = '300' />
          <div className='bg-[#F7EF7D] rounded-2xl h-20 mb-6 w-70 content-center border border-2 border-[#737373]'>ADD DATA +</div>
          <div className='bg-[#F7EF7D] rounded-2xl h-20  w-70 content-center border border-2 border-[#737373]'>LEARN MORE +</div>
        </div>
      </div>
    </div>
  )
}

export default Adahack
