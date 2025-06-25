import React from 'react';
import { GeneralInfoData } from '../../data/reportData';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

interface GeneralInfoProps {
  data: GeneralInfoData;
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({ data }) => {
  if (!data || !data.notes || data.notes.length === 0) {
    return null; // Don't render the card if there's no info
  }

  const { notes } = data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>7. General Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {notes && notes.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Notes</h4>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GeneralInfo;
