import { NextApiRequest, NextApiResponse } from 'next';
import { getSettingsData } from '@/backend/services/settings';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const settings = await getSettingsData();
    
    if (!settings) {
      return res.status(404).json({ message: 'Settings not found' });
    }

    res.status(200).json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// OR if using App Router, create app/api/settings/route.ts:

// import { NextResponse } from 'next/server';
// import { getSettingsData } from '@/backend/services/settings';

// export async function GET() {
//   try {
//     const settings = await getSettingsData();
    
//     if (!settings) {
//       return NextResponse.json({ message: 'Settings not found' }, { status: 404 });
//     }

//     return NextResponse.json(settings);
//   } catch (error) {
//     console.error('Error fetching settings:', error);
//     return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//   }
// }
