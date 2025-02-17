import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface EditIndividualFormProps {
  onSubmit: (data: IndividualFormData) => void;
  initialData?: IndividualFormData;
}

export interface IndividualFormData {
  hierarchy: string;
  lifeclassTopic: string;
  department: string;
  lifeClassTeacher: string;
  signature: string;
  photo?: File;
}

const EditIndividualForm: React.FC<EditIndividualFormProps> = ({ 
  onSubmit, 
  initialData 
}) => {
  const [formData, setFormData] = useState<IndividualFormData>({
    hierarchy: initialData?.hierarchy || 'Worker',
    lifeclassTopic: initialData?.lifeclassTopic || 'Topic 1',
    department: initialData?.department || 'Media',
    lifeClassTeacher: initialData?.lifeClassTeacher || 'Pastor Samson',
    signature: initialData?.signature || '',
    photo: undefined
  });

  const [photoPreview, setPhotoPreview] = useState<string>('');

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <Card>
        <CardContent className="space-y-6 pt-6">
          {/* Hierarchy Select */}
          <div className="space-y-2">
            <Label htmlFor="hierarchy">Hierarchy</Label>
            <Select
              value={formData.hierarchy}
              onValueChange={(value) => 
                setFormData(prev => ({ ...prev, hierarchy: value }))
              }
            >
              <SelectTrigger id="hierarchy">
                <SelectValue placeholder="Select hierarchy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Worker">Worker</SelectItem>
                <SelectItem value="Leader">Leader</SelectItem>
                <SelectItem value="Pastor">Pastor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Life Class Topic */}
          <div className="space-y-2">
            <Label htmlFor="lifeclassTopic">Life Class Topic</Label>
            <Input
              id="lifeclassTopic"
              value={formData.lifeclassTopic}
              onChange={(e) => 
                setFormData(prev => ({ ...prev, lifeclassTopic: e.target.value }))
              }
              className="w-full"
            />
          </div>

          {/* Department */}
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select
              value={formData.department}
              onValueChange={(value) => 
                setFormData(prev => ({ ...prev, department: value }))
              }
            >
              <SelectTrigger id="department">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Media">Media</SelectItem>
                <SelectItem value="Protocol">Protocol</SelectItem>
                <SelectItem value="Choir">Choir</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Life Class Teacher */}
          <div className="space-y-2">
            <Label htmlFor="lifeClassTeacher">Life Class Teacher</Label>
            <Input
              id="lifeClassTeacher"
              value={formData.lifeClassTeacher}
              onChange={(e) => 
                setFormData(prev => ({ ...prev, lifeClassTeacher: e.target.value }))
              }
              className="w-full"
            />
          </div>

          {/* Photo Upload */}
          <div className="space-y-2">
            <Label htmlFor="photo">Photo</Label>
            <div className="mt-1 flex items-center">
              {photoPreview ? (
                <div className="relative w-32 h-32">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="object-cover rounded-lg"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">No photo</span>
                </div>
              )}
              <Input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="ml-4"
              />
            </div>
          </div>

          {/* Signature */}
          <div className="space-y-2">
            <Label htmlFor="signature">Your Signature</Label>
            <Input
              id="signature"
              value={formData.signature}
              onChange={(e) => 
                setFormData(prev => ({ ...prev, signature: e.target.value }))
              }
              className="w-full"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            Save
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default EditIndividualForm;